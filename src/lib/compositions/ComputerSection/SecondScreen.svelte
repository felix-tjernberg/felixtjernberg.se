<script lang="ts">
    import { fade } from "svelte/transition"
    import { dialUpAudioCurrentTime, dialUpAudioPaused } from "$stores/states/dialUpAudio"
    import { audioVolume, audioVolumeKey } from "$stores/settings/audioVolume"
    import Slider from "$components/Slider/Slider.svelte"
    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { setJSCookie } from "$utilities/setJSCookie"

    $dialUpAudioCurrentTime = 0
</script>

<div id="second-screen" class="flex-column height-100percent" in:fade>
    <div class="margin-vertical-auto margin-vertical-flow padding-vertical">
        <p class="font-family-primary-fat">
            <span aria-hidden="true">.</span><span aria-hidden="true">.</span><span aria-hidden="true">.</span
            >Initia<wbr />lizing<span class="loading-dot">.</span><span class="loading-dot">.</span><span
                class="loading-dot">.</span>
        </p>
        <details>
            <summary>dial up audio audio player</summary>
            <audio
                controls
                class="margin-auto"
                src="https://www.soundjay.com/communication/sounds/dial-up-modem-01.mp3"
                bind:paused={$dialUpAudioPaused}
                bind:volume={$audioVolume}
                on:canplay={() => ($dialUpAudioPaused = false)} />
        </details>
        <Slider
            bind:value={$audioVolume}
            name={audioVolumeKey}
            max={0.5}
            description="audio volume"
            label="dial up music volume"
            on:change={() => $cookiesAllowed && setJSCookie(audioVolumeKey, String($audioVolume))} />
    </div>
</div>

<style>
    #second-screen {
        max-height: 100vh;
        overflow-y: auto;
    }
    @media (min-height: 500px) {
        #second-screen > div {
            margin-top: calc(50% - 2em);
        }
    }
    [aria-hidden="true"] {
        opacity: 0;
    }
    @media (max-width: 500px) {
        [aria-hidden="true"] {
            display: none;
        }
    }
    .loading-dot:nth-last-of-type(1) {
        animation: dot3 1.337s infinite;
    }
    .loading-dot:nth-last-of-type(2) {
        animation: dot2 1.337s infinite;
    }
    .loading-dot:nth-last-of-type(3) {
        animation: dot1 1.337s infinite;
    }
    @keyframes dot1 {
        0% {
            opacity: 0;
        }
        33% {
            opacity: 1;
        }
        66% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }
    @keyframes dot2 {
        0% {
            opacity: 0;
        }
        33% {
            opacity: 0;
        }
        66% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    @keyframes dot3 {
        0% {
            opacity: 0;
        }
        33% {
            opacity: 0;
        }
        66% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
