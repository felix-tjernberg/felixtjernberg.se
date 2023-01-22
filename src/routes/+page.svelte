<script lang="ts">
    import "$lib/stylesheets/stylesheets.css"
    import { audioVolume } from "$stores/audioVolumeStore"
    import { browser } from "$app/environment"
    import { locale } from "svelte-intl-precompile"
    import { t } from "svelte-intl-precompile"

    import StarfieldBackground from "$components/StarfieldBackground.svelte"
    import FirstTimeVisitOverlay from "$compositions/FirstTimeVisitOverlay/FirstTimeVisitOverlay.svelte"

    let elevatorMusicAudioElement: HTMLAudioElement
    let elevatorMusicPaused: boolean = true
    $: if (elevatorMusicAudioElement) elevatorMusicAudioElement.volume = $audioVolume

    $: if (browser) document.documentElement.lang = $locale

    if (browser) window.localStorage.clear()
</script>

<svelte:head>
    <title>Felix Tjernberg</title>
    <meta name="description" content={$t("description")} />
</svelte:head>
<audio
    bind:this={elevatorMusicAudioElement}
    bind:paused={elevatorMusicPaused}
    src="https://incompetech.com/music/royalty-free/mp3-royaltyfree/Local%20Forecast.mp3" />

<StarfieldBackground />

<FirstTimeVisitOverlay
    on:startElevatorMusic={() => (elevatorMusicPaused = false)}
    on:stopElevatorMusic={() => (elevatorMusicPaused = true)} />
