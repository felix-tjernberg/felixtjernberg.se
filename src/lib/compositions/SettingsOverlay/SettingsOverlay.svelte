<script lang="ts">
    import { fade } from "svelte/transition"
    import { audioVolume } from "$stores/settings/audioVolume"
    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { darkMode } from "$stores/settings/darkMode"
    import { likesEightBitFont } from "$stores/settings/likesEightBitFontStore"
    import { computerScreenIndex } from "$stores/states/computer"
    import { scavengerHuntDone } from "$stores/states/scavengerHuntDone"

    import BooleanButton from "$components/BooleanButton/BooleanButton.svelte"
    import Button from "$components/Button/Button.svelte"
    import Close from "$assets/svgs/Close.svelte"
    import Moon from "$assets/svgs/Moon.svelte"
    import SettingsText from "$assets/svgs/SettingsText.svelte"
    import Slider from "$components/Slider/Slider.svelte"
    import Sun from "$assets/svgs/Sun.svelte"
    import { onMount } from "svelte"

    export let dialog: HTMLDialogElement
    onMount(() => {
        $likesEightBitFont = JSON.parse($likesEightBitFont)
        $darkMode = JSON.parse($darkMode)
    })
</script>

<dialog bind:this={dialog} id="settings-dialog" class="relative background-blur" data-testid="settings-dialog">
    <h2><span class="visually-hidden">settings</span><SettingsText /></h2>
    <div id="settings-box" class="flex flex-center background-blur">
        <div class="flex-column-center">
            <h3>Do you like reading 8bit font?</h3>
            <BooleanButton labels={["yes", "no"]} bind:boolean={$likesEightBitFont} testid="likes-eight-bit-font" />
        </div>
        <div class="flex-column-center">
            <h3>Volume</h3>
            <Slider label="Volume" bind:value={$audioVolume} />
        </div>
        <div id="dark-mode">
            <h3>Dark/Light mode</h3>
            <BooleanButton labels={["dark", "light"]} bind:boolean={$darkMode} testid="dark-mode">
                <Moon slot="firstIcon" />
                <Sun slot="secondIcon" />
            </BooleanButton>
        </div>
        <div class="flex-column-center">
            {#if JSON.parse($cookiesAllowed)}
                <h3>Changed your mind about cookies?</h3>
                <Button
                    label="Yes delete cookies!"
                    on:click={() => ($cookiesAllowed = false)}
                    testid="cookies-allowed-false" />
            {:else}
                <h3>Changed your mind about cookies?</h3>
                <Button
                    label="Yes allow essential cookies"
                    on:click={() => ($cookiesAllowed = true)}
                    testid="cookies-allowed-true" />
            {/if}
        </div>
        {#if JSON.parse($scavengerHuntDone)}
            <div class="flex-column-center" transition:fade={{ duration: 1337 }}>
                <h3>Want to do the scavenger hunt again?</h3>
                <Button
                    label="yes restart scavenger hunt!"
                    on:click={() => {
                        $scavengerHuntDone = false
                        $computerScreenIndex = 0
                    }}
                    testid="reset-scavenger-hunt" />
            </div>
        {/if}
    </div>
    <Button id="close-settings" label="close settings" on:click={() => dialog.close()} testid="close-settings">
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
        gap: var(--static-scale-400);
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
    :global(#dark-mode button) {
        font-size: var(--static-scale-300);
    }
    :global(#dark-mode button path) {
        stroke-width: 2px !important;
    }
    @media (max-width: 720px) {
        #settings-dialog {
            grid-template-rows: 20% 1fr;
        }
        #settings-box {
            margin: 0;
            padding: 1em;
        }
        :global(#close-settings > button) {
            margin-right: 0;
            margin-top: 0;
        }
    }
</style>
