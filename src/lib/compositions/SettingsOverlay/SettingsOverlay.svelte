<script lang="ts">
    import BooleanButton from "$components/BooleanButton/BooleanButton.svelte"
    import Slider from "$components/Slider/Slider.svelte"
    import Button from "$components/Button/Button.svelte"
    import SettingsText from "$assets/icons/SettingsText.svelte"
    import Close from "$assets/icons/Close.svelte"
    import { fade } from "svelte/transition"

    let value = 0.5
    let eightParagrafBitFont = true
    let flickerSensitive = true
    let scavengerHuntDone = true
    let cookiesAllowed = true
    export let dialog: HTMLDialogElement
</script>

<dialog bind:this={dialog} id="settings" class="relative">
    <h2><span class="visually-hidden">settings</span><SettingsText /></h2>
    <div class="flex flex-center">
        <div>
            <h3>Do you like reading 8bit font?</h3>
            <BooleanButton labels={["yes", "no"]} bind:boolean={eightParagrafBitFont} />
        </div>
        <div>
            <h3>Volume</h3>
            <Slider label="Volume" bind:value />
        </div>
        <div>
            <h3>Are you flicker sensitive?</h3>
            <BooleanButton labels={["yes", "no"]} bind:boolean={flickerSensitive} />
        </div>
        <div>
            {#if cookiesAllowed}
                <h3>Changed your mind about cookies?</h3>
                <Button label="Yes delete cookies!" on:click={() => (cookiesAllowed = false)} />
            {:else}
                <h3>Changed your mind about cookies?</h3>
                <Button label="Yes allow essential cookies" on:click={() => (cookiesAllowed = true)} />
            {/if}
        </div>
        {#if scavengerHuntDone}
            <div transition:fade={{ duration: 1337 }}>
                <h3>Want to do the scavenger hunt again?</h3>
                <Button label="yes restart scavenger hunt!" on:click={() => (scavengerHuntDone = false)} />
            </div>
        {/if}
    </div>
    <Button id="close-settings" label="close settings" on:click={() => dialog.close()}>
        <Close slot="icon" />
    </Button>
</dialog>

<style>
    #settings {
        background-color: transparent;
        background-image: var(--gradient-90-percent);
        grid-template-rows: 33% 1fr;
        height: auto;
        width: auto;
        max-width: 100%;
        max-height: 100%;
        overflow: hidden;
    }
    #settings[open] {
        display: grid;
    }
    #settings > h2 {
        height: 100%;
        width: 100%;
        translate: 0 25%;
    }
    :global(#settings h2 > svg) {
        height: 100%;
        width: 75%;
    }
    :global(#settings button) {
        margin-top: 12px;
    }
    #settings > .flex {
        border: var(--stroke-300) solid var(--gray-100);
        margin-left: auto;
        margin-right: auto;
        margin-top: 3%;
        overflow-y: auto;
        overflow-x: hidden;
        margin-right: 10%;
        margin-left: 10%;
        margin-bottom: 10%;
        flex-wrap: wrap;
        gap: 3em;
        padding: 3em;
    }
    .flex > div {
        flex-basis: content;
        min-width: 300px;
    }
    #settings,
    #settings > div {
        backdrop-filter: blur(7px) saturate(50%);
    }
    :global([data-dark-mode="false"] #settings > div) {
        background-color: var(--white-50-percent);
    }
    :global(#close-settings) {
        position: fixed;
        top: 1em;
        right: 1em;
        font-size: var(--font-size-400);
    }
    @media (max-width: 720px) {
        #settings {
            grid-template-rows: 20% 1fr;
        }
        #settings .flex {
            margin: 0;
            padding: 1em;
        }
        .flex > div {
            min-width: 100%;
        }
        :global(#close-settings) {
            top: 0;
            right: 10px;
            font-size: var(--font-size-300);
        }
        :global(#close-settings > svg) {
            margin-right: 0;
            margin-top: 0;
        }
    }
</style>
