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

<dialog bind:this={dialog} id="settings-dialog" class="relative background-blur">
    <h2><span class="visually-hidden">settings</span><SettingsText /></h2>
    <div id="settings-box" class="flex flex-center background-blur">
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
    #settings-dialog {
        background-color: transparent;
        background-image: var(--gradient-90-percent);
        grid-template-rows: 33% 1fr;
        height: auto;
        max-height: 100%;
        max-width: 100%;
        overflow: hidden;
        width: auto;
    }
    #settings-dialog[open] {
        display: grid;
    }
    #settings-dialog > h2 {
        height: 100%;
        translate: 0 25%;
        width: 100%;
    }
    :global(#settings-dialog h2 > svg) {
        height: 100%;
        width: 75%;
    }
    :global(#settings-dialog button) {
        margin-top: 12px;
    }
    #settings-dialog,
    #settings-box {
        --background-blur-amount: 7px;
    }
    #settings-box {
        border: var(--stroke-300) solid var(--gray-100);
        flex-wrap: wrap;
        gap: var(--static-scale-300);
        margin: 3% 10% 10% 10%;
        overflow-x: hidden;
        overflow-y: auto;
        padding: var(--static-scale-300);
    }
    #settings-box > div {
        flex-basis: content;
        min-width: 300px;
    }
    :global([data-dark-mode="false"] #settings-box) {
        background-color: var(--white-50-percent);
    }
    :global(#close-settings) {
        position: absolute;
        top: 1em;
        right: 1em;
        font-size: var(--static-scale-400);
        margin-top: 0 !important;
    }
    @media (max-width: 720px) {
        #settings-dialog {
            grid-template-rows: 20% 1fr;
        }
        #settings-box {
            margin: 0;
            padding: 1em;
        }
        #settings-box > div {
            min-width: 100%;
        }
        :global(#close-settings) {
            top: 0;
            right: 0;
            font-size: var(--static-scale-300);
        }
        :global(#close-settings > button) {
            margin-right: 0;
            margin-top: 0;
        }
    }
</style>
