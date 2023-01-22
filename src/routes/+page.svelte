<script lang="ts">
    import "$lib/stylesheets/stylesheets.css"
    import { audioVolume } from "$stores/audioVolumeStore"
    import { browser } from "$app/environment"
    import { darkMode } from "$stores/darkModeStore"
    import { likesEightBitFont } from "$stores/likesEightBitFontStore"
    import { locale } from "svelte-intl-precompile"
    import { t } from "svelte-intl-precompile"

    import Button from "$components/Button/Button.svelte"
    import FirstTimeVisitOverlay from "$compositions/FirstTimeVisitOverlay/FirstTimeVisitOverlay.svelte"
    import SettingsIcon from "$assets/svgs/SettingsIcon.svelte"
    import SettingsOverlay from "$compositions/SettingsOverlay/SettingsOverlay.svelte"
    import StarfieldBackground from "$components/StarfieldBackground.svelte"

    let settingsOverlay: HTMLDialogElement

    let elevatorMusicAudioElement: HTMLAudioElement
    let elevatorMusicPaused: boolean = true
    $: if (elevatorMusicAudioElement) elevatorMusicAudioElement.volume = $audioVolume

    $: if (browser) document.documentElement.lang = $locale

    $: if (browser) window.document.body.dataset.darkMode = $darkMode
    $: if (browser) window.document.body.dataset.eightBitFont = $likesEightBitFont
    // if (browser) window.localStorage.clear()
</script>

<svelte:head>
    <title>Felix Tjernberg</title>
    <meta name="description" content={$t("description")} />
</svelte:head>

<audio
    bind:this={elevatorMusicAudioElement}
    bind:paused={elevatorMusicPaused}
    src="https://incompetech.com/music/royalty-free/mp3-royaltyfree/Local%20Forecast.mp3" />

<nav class="font-size-400">
    <Button
        href="/settings"
        label="Open settings"
        on:click={(event) => {
            event.preventDefault()
            settingsOverlay.showModal()
        }}>
        <SettingsIcon slot="icon" />
    </Button>
</nav>

<StarfieldBackground />

<FirstTimeVisitOverlay
    on:startElevatorMusic={() => (elevatorMusicPaused = false)}
    on:stopElevatorMusic={() => (elevatorMusicPaused = true)} />
<SettingsOverlay bind:dialog={settingsOverlay} />

<style>
    :global(nav a) {
        font-size: var(--static-scale-400) !important;
        position: absolute !important;
        right: 1em;
        top: 1em;
    }
</style>
