<script lang="ts">
    import { fade } from "svelte/transition"
    import { dialUpAudioCurrentTime, dialUpAudioPaused } from "$stores/states/dialUpAudio"
    import { audioVolume } from "$stores/settings/audioVolume"
    import Slider from "$components/Slider/Slider.svelte"

    $dialUpAudioPaused = true
    $dialUpAudioCurrentTime = 0

    // $: if ($dialUpAudioCurrentTime > 25 && jsLoaded) $computerScreenIndex = 2
</script>

<div id="second-screen" class="relative" in:fade>
    <p class="font-family-primary-fat">Initia<wbr />lizing<span>.</span><span>.</span><span>.</span></p>
    <!-- TODO put in form -->
    <Slider label="volume slider" description="audio volume" bind:value={$audioVolume} />
</div>

<style>
    #second-screen {
        display: grid;
        place-content: center;
        height: 100%;
        width: 100%;
    }
    :global(#second-screen .slider) {
        position: absolute;
        bottom: 1em;
        left: 50%;
        translate: -50%;
    }
    span:nth-of-type(1) {
        animation: dot1 1.337s infinite;
    }
    span:nth-of-type(2) {
        animation: dot2 1.337s infinite;
    }
    span:nth-of-type(3) {
        animation: dot3 1.337s infinite;
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
