<script lang="ts">
    import { audioVolume } from "$utilities/stores/audioVolumeStore"
    import { darkMode } from "$utilities/stores/darkModeStore"
    import { flickerSensitive } from "$utilities/stores/flickerSensitiveStore"
    import { paragrafAsEightBitFont } from "$utilities/stores/paragrafAsEightBitFontStore"

    import BooleanButton from "$components/BooleanButton/BooleanButton.svelte"
    import Moon from "$assets/svgs/Moon.svelte"
    import Slider from "$components/Slider/Slider.svelte"
    import Sun from "$assets/svgs/Sun.svelte"
    import { onMount } from "svelte"

    let dialog: HTMLDialogElement

    onMount(() => {
        dialog.showModal()
    })
</script>

<dialog bind:this={dialog} id="first-time-visit-dialog" class="relative background-blur">
    <div id="first-time-visit-box" class="flex-column-center background-blur">
        <h2><span class="visually-hidden">First Time Visit dialog</span></h2>
        <div>
            <h3>Do you like reading 8bit font?</h3>
            <BooleanButton labels={["yes", "no"]} bind:boolean={$paragrafAsEightBitFont} />
        </div>
        <div>
            <h3>Are you flicker sensitive?</h3>
            <BooleanButton labels={["yes", "no"]} bind:boolean={$flickerSensitive} />
        </div>
        <div>
            <h3>Volume</h3>
            <Slider label="Volume" bind:value={$audioVolume} />
        </div>
        <div id="dark-mode">
            <h3>Dark/Light mode</h3>
            <BooleanButton labels={["dark", "light"]} bind:boolean={$darkMode}>
                <Moon slot="firstIcon" />
                <Sun slot="secondIcon" />
            </BooleanButton>
        </div>
    </div>
</dialog>

<style>
    #first-time-visit-dialog {
        background-color: transparent;
        background-image: var(--gradient-90-percent);
        height: auto;
        max-height: 100%;
        max-width: 100%;
        overflow: hidden;
        place-items: center;
        width: auto;
    }
    #first-time-visit-dialog[open] {
        display: grid;
    }
    #first-time-visit-dialog,
    #first-time-visit-box {
        --background-blur-amount: 7px;
    }
    #first-time-visit-box {
        border: var(--stroke-300) solid var(--gray-100);
        flex-wrap: wrap;
        gap: var(--static-scale-400);
        overflow-x: hidden;
        overflow-y: auto;
        padding: var(--static-scale-300);
    }
    #first-time-visit-box > div {
        flex-basis: content;
        min-width: 300px;
    }
    :global([data-dark-mode="false"] #first-time-visit-box) {
        background-color: var(--white-50-percent);
    }
    :global(#close-first-time-visit) {
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
        #first-time-visit-dialog {
            grid-template-rows: 20% 1fr;
        }
        #first-time-visit-box {
            margin: 0;
            padding: 1em;
        }
        :global(#close-first-time-visit) {
            top: 0;
            right: 0;
            font-size: var(--static-scale-300);
        }
        :global(#close-first-time-visit > button) {
            margin-right: 0;
            margin-top: 0;
        }
    }
</style>
