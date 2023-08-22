<script lang="ts">
    import { fade } from "svelte/transition"

    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import {
        navigationState,
        NavigationSchema,
        type NavigationStates,
        navigationStateKey,
    } from "$stores/states/navigation"
    import HiddenInputs from "$components/HiddenInputs.svelte"

    export let navigationActive: boolean = true
    export let navigationStateName: NavigationStates
</script>

{#if navigationActive}
    <div class="navigation-link">
        {#if $cookiesAllowed}
            <a
                tabindex="-1"
                on:click={() => ($navigationState = NavigationSchema.enum[navigationStateName])}
                transition:fade
                href={`/${navigationStateName}`}>
                <span class="visually-hidden">computer</span>
                <slot name="textSVG" />
            </a>
        {:else}
            <form tabindex="-1">
                <HiddenInputs excludeStates={[navigationStateKey]} />
                <button
                    tabindex="-1"
                    name={navigationStateKey}
                    value={NavigationSchema.enum[navigationStateName]}
                    on:click={() => ($navigationState = NavigationSchema.enum[navigationStateName])}
                    transition:fade>
                    <span class="visually-hidden">computer</span>
                    <slot name="textSVG" />
                </button>
            </form>
        {/if}
    </div>
{/if}

<style>
    button,
    .navigation-link > * {
        position: absolute;
        inset: 0;
        max-width: none;
        width: 100%;
    }
    .navigation-link > * {
        align-items: center;
        backdrop-filter: blur(4px) saturate(90%);
        display: flex;
        place-content: center;
        padding: 1em;
        z-index: 9999;
    }
    :global(.navigation-link svg) {
        height: 75%;
        width: 75%;
    }
</style>
