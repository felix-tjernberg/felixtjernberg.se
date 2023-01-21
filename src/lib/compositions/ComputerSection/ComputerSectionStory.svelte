<script lang="ts">
    import ComputerSection from "./ComputerSection.svelte"
    import { audioVolume } from "$utilities/stores/audioVolumeStore"
    import { dialUpAudioCurrentTime, dialUpAudioPaused } from "$utilities/stores/computerSectionStores"
</script>

<div class="wrapper">
    <audio
        bind:volume={$audioVolume}
        bind:paused={$dialUpAudioPaused}
        bind:currentTime={$dialUpAudioCurrentTime}
        src="https://www.soundjay.com/communication/sounds/dial-up-modem-01.mp3" />
    <ComputerSection />
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
