<script lang="ts">
    import FirstTimeVisitOverlay from "./FirstTimeVisitOverlay.svelte"
    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { darkMode } from "$stores/settings/darkMode"
    import { likesEightBitFont } from "$stores/settings/likesEightBitFont"
    import { audioVolume } from "$stores/settings/audioVolume"

    window.localStorage.clear()
    $audioVolume = 0.1
    $cookiesAllowed = false
    $darkMode = true
    $likesEightBitFont = true

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
