<script lang="ts">
    import ComputerSection from "./ComputerSection.svelte"
    import { audioVolume } from "$utilities/stores/audioVolumeStore"
    import {
        dialUpAudioCurrentTime,
        dialUpAudioPaused,
        phoneRingtonePaused
    } from "$utilities/stores/computerSectionStores"
    import { activeSection } from "$utilities/stores/activeSectionStore"
    import { onDestroy } from "svelte"
    import { SectionsSchema } from "$compositions/NavigationWrapper/NavigationSectionsSchema"

    export let screenIndex: number = 0

    let phoneRingtoneTimeout: ReturnType<typeof setTimeout>

    $activeSection = SectionsSchema.enum.computer

    $: if (!$phoneRingtonePaused) phoneRingtoneTimeout = setTimeout(() => ($phoneRingtonePaused = true), 5000)
    onDestroy(() => clearTimeout(phoneRingtoneTimeout))
</script>

<div class="wrapper">
    <audio
        bind:volume={$audioVolume}
        bind:paused={$phoneRingtonePaused}
        src="https://cdn.pixabay.com/download/audio/2021/08/09/audio_a4637e27f0.mp3?filename=smartphone_vibrating_alarm_silent-7040.mp3" />
    <audio
        bind:volume={$audioVolume}
        bind:paused={$dialUpAudioPaused}
        bind:currentTime={$dialUpAudioCurrentTime}
        src="https://www.soundjay.com/communication/sounds/dial-up-modem-01.mp3" />
    <ComputerSection {screenIndex} />
    <p class="visually-hidden" data-testid="active-section-indicator">activeSection indicator: {$activeSection}</p>
</div>

<style>
    .wrapper {
        height: 97vh;
        width: 97vw;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
</style>
