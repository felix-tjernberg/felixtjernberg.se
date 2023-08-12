<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"

    import { enhance } from "$app/forms"
    import { fade } from "svelte/transition"

    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { booleanNameKey, valueKey } from "$utilities/toggleBooleanKeys"
    import { setJSCookie } from "$utilities/setJSCookie"

    export let active = false
    export let booleanName: string
    export let booleanValue: "true" | "false" = "true"
    export let testid: string | undefined = undefined
</script>

{#if active}
    <aside class="notification background-blur glow absolute border-horizontal" transition:fade data-testid={testid}>
        <slot />
        {#if $cookiesAllowed}
            <form
                action="?/toggleBoolean"
                method="POST"
                use:enhance={({ cancel }) => {
                    cancel()
                    active = false
                    if ($cookiesAllowed) setJSCookie(booleanName, booleanValue)
                }}>
                <input type="hidden" name={booleanNameKey} value={booleanName} />
                <Button label="close notification" underlined={true} name={valueKey} value={booleanValue} />
            </form>
        {:else}
            <form on:submit={() => (active = false)}>
                <HiddenInputs excludeStates={[booleanName]} />
                <Button label="close notification" underlined={true} name={booleanName} value={booleanValue} />
            </form>
        {/if}
    </aside>
{/if}

<style>
    .notification {
        z-index: 9001;
        --background-blur-amount: 7px;
        --stroke-width: var(--stroke-200);
        color: var(--gray-900);
        left: 50%;
        padding: 0.5em 1em;
        top: 1em;
        translate: -50%;
        max-width: max-content;
        max-height: calc(100vh - 2em);
        overflow-y: auto;
        width: 90%;
    }
    :global(.notification p) {
        max-width: 100%;
    }
    :global([data-dark-mode="false"] .notification) {
        --glow-color: var(--white);
        --stroke-width: var(--stroke-400);
        --stroke-color: var(--gray-000);
    }
    :global(.notification button) {
        background-color: var(--gray-000) !important;
        font-family: var(--font-family-primary-thin) !important;
        inset: 0;
        max-width: 100%;
        opacity: 0;
        position: absolute !important;
        transition: opacity 420ms ease-in-out;
    }
    :global(.notification:hover button),
    :global(.notification button:focus) {
        opacity: 1;
    }
    @media (max-width: 500px) {
        :global(.notification p.font-size-200) {
            font-size: var(--static-scale-100) !important;
        }
    }
</style>
