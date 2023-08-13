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
    <aside class="notification absolute background-blur border-horizontal glow" transition:fade data-testid={testid}>
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
    .notification :global(button) {
        background-color: var(--gray-000) !important;
        inset: 0;
        max-width: 100%;
        width: 100%;
        opacity: 0;
        position: absolute !important;
        transition: opacity 420ms ease-in-out;
    }
    .notification:hover :global(button),
    .notification :global(button:focus) {
        opacity: 1;
    }
</style>
