<script lang="ts">
    import { onDestroy } from "svelte"
    import { locale, t } from "svelte-intl-precompile"

    import { audioVolume } from "$utilities/stores/audioVolumeStore"

    const LOCALES = ["en", "se"]
    const LANGUAGE_INTERVAL = setInterval(() => {
        $locale = LOCALES[localeIndex]
        localeIndex === 1 ? (localeIndex = 0) : (localeIndex += 1)
    }, 2000)

    let audioPlayer: HTMLAudioElement
    let paused: boolean

    let localeIndex = 0

    $: if (audioPlayer) audioPlayer.volume = $audioVolume

    onDestroy(() => {
        clearInterval(LANGUAGE_INTERVAL)
    })
</script>

<svelte:head>
    <title>Felix Tjernberg</title>
    <meta name="description" content={$t("description")} />
</svelte:head>

<audio
    bind:paused
    bind:this={audioPlayer}
    src="https://incompetech.com/music/royalty-free/mp3-royaltyfree/Local%20Forecast.mp3" />

<main class="vertical-flow-200">
    <div>
        <h1>
            {$t("welcome")}
        </h1>
        <p class="margin">
            {$t("greeting", { values: { name: "Felix" } })}
        </p>
    </div>
    <div class="flex-column flex-center vertical-flow-100">
        <label class="flex-column flex-center">
            <span>{$t("musicVolume")}</span>
            <input type="range" bind:value={$audioVolume} step="0.01" min="0" max="1" />
        </label>
        <button on:click={() => (audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause())}>
            <span>{$t("toggleMusic")}</span>
        </button>
    </div>
</main>

<footer class="absolute" style={paused ? "" : "opacity: 0.5"}>
    <p>
        Local Forecast- Elevator Kevin MacLeod (incompetech.com)<br />
        Licensed under Creative Commons: By Attribution 3.0<br />
        creativecommons.org/licenses/by/3.0/<br />
    </p>
</footer>

<style>
    footer.absolute {
        bottom: 0;
        left: 50%;
        opacity: 0;
        translate: -50%;
        font-size: 12px;
        transition: opacity 0.5s;
    }
    footer.absolute:focus-within,
    footer.absolute:hover {
        opacity: 0.5;
    }
</style>
