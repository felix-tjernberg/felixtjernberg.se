<script lang="ts">
    import FirstTimeVisitOverlay from "./FirstTimeVisitOverlay.svelte"
    import { flickerSensitive } from "$utilities/stores/flickerSensitiveStore"
    import { cookiesAllowed } from "$utilities/stores/cookiesAllowedStore"
    import { darkMode } from "$utilities/stores/darkModeStore"
    import { likesEightBitFont } from "$utilities/stores/likesEightBitFontStore"
    import { audioVolume } from "$utilities/stores/audioVolumeStore"

    window.localStorage.clear()
    $audioVolume = 0.1
    $cookiesAllowed = false
    $darkMode = true
    $likesEightBitFont = true
    $flickerSensitive = true

    let elevatorMusicAudioElement: HTMLAudioElement
    let elevatorMusicPaused: boolean

    $: if (elevatorMusicAudioElement) elevatorMusicAudioElement.volume = $audioVolume
</script>

<div data-testid="first-time-wrapper">
    <audio
        bind:paused={elevatorMusicPaused}
        bind:this={elevatorMusicAudioElement}
        src="https://incompetech.com/music/royalty-free/mp3-royaltyfree/Local%20Forecast.mp3" />
    <FirstTimeVisitOverlay
        on:startElevatorMusic={() => (elevatorMusicPaused = false)}
        on:stopElevatorMusic={() => (elevatorMusicPaused = true)} />
    <p class="visually-hidden" data-testid="cookies-allowed-indicator">{$cookiesAllowed}</p>
    <p class="visually-hidden" data-testid="dark-mode-indicator">{$darkMode}</p>
    <p class="visually-hidden" data-testid="flicker-sensitive-indicator">{$flickerSensitive}</p>
    <p class="visually-hidden" data-testid="likes-eight-bit-font-indicator">{$likesEightBitFont}</p>
    <p class="visually-hidden" data-testid="volume-indicator">{$audioVolume}</p>
    <p class="visually-hidden" data-testid="elevator-music-playing-indicator">{elevatorMusicPaused}</p>
</div>

<style>
    div {
        height: 420px;
        width: 100vw;
    }
</style>
