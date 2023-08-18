<script lang="ts">
    import ComputerSection from "./ComputerSection.svelte"
    import { audioVolume } from "$stores/settings/audioVolume"
    import { navigationState, NavigationSchema } from "$stores/states/navigation"
    import { dialUpAudioCurrentTime, dialUpAudioPaused } from "$stores/states/dialUpAudio"
    import { phoneRingtonePaused } from "$stores/states/phoneRingtonePaused"
    import { onDestroy } from "svelte"

    export let computerScreenIndex: number = 0

    let phoneRingtoneTimeout: ReturnType<typeof setTimeout>

    $navigationState = NavigationSchema.enum.computer

    $: if (!$phoneRingtonePaused) phoneRingtoneTimeout = setTimeout(() => ($phoneRingtonePaused = true), 5000)
    onDestroy(() => clearTimeout(phoneRingtoneTimeout))
</script>

<div class="wrapper">
    <button class="visually-hidden" data-testid="skip-init-screen" on:click={() => (computerScreenIndex = 2)}
        >skip init screen</button>
    <p class="visually-hidden" data-testid="navigation-state-indicator">
        navigationState indicator: {$navigationState}
    </p>
    <p class="visually-hidden" data-testid="initialize-noise-playing-indicator">
        initialize noise playing: {$dialUpAudioPaused}
    </p>
    <audio
        bind:volume={$audioVolume}
        bind:paused={$phoneRingtonePaused}
        src="https://cdn.pixabay.com/download/audio/2021/08/09/audio_a4637e27f0.mp3?filename=smartphone_vibrating_alarm_silent-7040.mp3" />
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
    }
</style>
