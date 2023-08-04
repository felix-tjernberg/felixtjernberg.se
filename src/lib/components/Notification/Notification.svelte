<script lang="ts">
    import Button from "$components/Button/Button.svelte"

    import { enhance } from "$app/forms"
    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { fade } from "svelte/transition"
    import { formNameKey, valueKey } from "$utilities/globalKeys"
    import { setJSCookie } from "$utilities/setJSCookie"

    export let active = false
    export let closeButton = true
    export let formName: string | undefined = undefined
    export let formValue: string = "true"
    export let testid: string | undefined = undefined
</script>

{#if active}
    <aside
        class="notification background-blur flex-column-center glow absolute border-horizontal"
        transition:fade
        data-testid={testid}>
        <slot />
        <!-- TODO: change close button to be a toggle instead -->
        {#if closeButton}
            <form
                action="?/toggleBoolean"
                method="POST"
                use:enhance={({ cancel }) => {
                    cancel()
                    active = false
                    if ($cookiesAllowed && formName) setJSCookie(formName, formValue)
                }}>
                <input type="hidden" name={formNameKey} value={formName} />
                <Button label="close notification" underlined={true} name={valueKey} value={formValue} />
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
        min-height: 48px;
        min-width: 48px;
        padding: 0.5em 1em;
        scale: 1;
        top: 5em;
        transition: scale 420ms ease-in-out;
        translate: -50%;
        max-width: max-content;
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
        height: 100%;
        left: 0;
        max-width: 100%;
        opacity: 0;
        position: absolute !important;
        top: 0;
        transition: opacity 420ms ease-in-out;
        width: 100%;
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
    @media (max-width: 720px) {
        .notification {
            top: auto;
            bottom: 1em;
        }
    }
</style>
