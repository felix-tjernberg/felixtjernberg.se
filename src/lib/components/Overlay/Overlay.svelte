<script lang="ts">
    import Close from "$assets/svgs/Close.svelte"

    import Button from "$components/Button/Button.svelte"

    import { scale } from "svelte/transition"

    export let headerText: string
    export let closeButton: boolean = true
    export let open = true
</script>

{#if open}
    <dialog open={true} class="background-blur height-100percent padding" transition:scale>
        <section class="margin-horizontal-auto height-100percent">
            <h2>
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
            <Button
                class="absolute"
                id="close-settings"
                label="close settings"
                on:click={() => (open = false)}
                testid="close-settings">
                <Close slot="icon" />
            </Button>
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
    }
    :global(dialog > button) {
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
        grid-template-rows: 33% auto;
    }
    h2 {
        height: max-content;
        place-self: end center;
    }
    .box {
        place-self: start;
        overflow-x: auto;
        --margin-vertical-flow-amount: 2em;
    }
    .spacer {
        height: 1em;
    }
    @media (min-width: 696px) {
        section {
            width: max-content;
        }
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
