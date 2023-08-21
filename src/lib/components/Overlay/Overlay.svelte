<script lang="ts">
    import Close from "$assets/svgs/Close.svelte"
    import Button from "$components/Button/Button.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"

    import { enhance } from "$app/forms"
    import { scale } from "svelte/transition"

    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { settingsOpen, settingsOpenKey } from "$stores/states/settingsOpen"

    import { setJSCookie } from "$utilities/setJSCookie"
    import { booleanNameKey, valueKey } from "$utilities/toggleBooleanKeys"

    export let headerText: string
    export let closeButton: boolean = true
    export let open = true
</script>

{#if open}
    <dialog open={true} class="background-blur height-100percent padding" transition:scale>
        <section class="margin-horizontal-auto height-100percent">
            <h2 class="width-100percent">
                <slot name="headerTextSVG" />
                <span class="visually-hidden">{headerText}</span>
            </h2>
            <div>
                <div
                    class="box flex-column-center background-blur margin-vertical-flow padding box-border width-100percent"
                    style="--padding-amount: 1em 2em 2em 2em;">
                    <slot />
                </div>
                <div class="spacer" />
            </div>
        </section>
        {#if closeButton}
            <!-- TODO this is not general solution, as these forms are to toggle settingsOpen, in the future if I need more overlays I can export a variable with what booleanName should be updated, similar for how I do it in BooleanButton component, also the button should say which overlay is being closed -->
            {#if $cookiesAllowed}
                <form
                    class="absolute"
                    action="?/toggleBoolean"
                    method="POST"
                    use:enhance={({ cancel }) => {
                        cancel()
                        if ($cookiesAllowed) setJSCookie(settingsOpenKey, "false")
                        $settingsOpen = false
                    }}>
                    <input type="hidden" name={booleanNameKey} value={settingsOpenKey} />
                    <Button label="close settings" name={valueKey} testid="close-settings" value="false">
                        <Close slot="icon" />
                    </Button>
                </form>
            {:else}
                <form class="absolute" on:submit={() => ($settingsOpen = false)}>
                    <HiddenInputs excludeStates={[settingsOpenKey]} />
                    <Button label="close settings" name={settingsOpenKey} testid="close-settings" value="false">
                        <Close slot="icon" />
                    </Button>
                </form>
            {/if}
        {/if}
    </dialog>
{/if}

<style>
    dialog,
    .box {
        --background-blur-amount: 7px;
    }
    dialog {
        background-color: transparent;
        background-image: var(--gradient-90-percent);
        max-height: 100%;
        max-width: 100%;
        overflow: auto;
        z-index: 42069;
    }
    form {
        top: 1em;
        right: 1em;
    }
    :global(dialog .icon) {
        font-size: var(--relative-scale-300) !important;
    }
    :global(dialog h2 > svg) {
        height: 100%;
        width: 100%;
        place-self: end center;
    }
    section {
        display: grid;
        grid-template-rows: 50% auto;
        max-width: 70ch;
    }
    h2 {
        height: max-content;
        place-self: end center;
    }
    .box {
        overflow-x: auto;
        --margin-vertical-flow-amount: 2em;
    }
    .spacer {
        height: 1em;
    }
    @media (max-width: 400px) {
        dialog {
            padding: 1em 0;
        }
    }
    @media (max-width: 300px) {
        .box {
            padding: 0.5em 1em;
        }
    }
</style>
