<script lang="ts">
    import AnswerForm from "./AnswerForm.svelte"
    import MultiDigitInput from "$components/MultiDigitInput/MultiDigitInput.svelte"
    import Slider from "$components/Slider/Slider.svelte"

    import { browser } from "$app/environment"
    import { fade } from "svelte/transition"

    import { answerKey, validateS6AnswerKey } from "./answerFormKeys"
    import { audioVolume, audioVolumeKey } from "$stores/settings/audioVolume"
    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { setJSCookie } from "$utilities/setJSCookie"
    import { phoneRingtonePaused } from "$stores/states/phoneRingtonePaused"
    import { F, scavengerHuntState } from "$stores/states/scavengerHuntState"

    $: momCalling = $scavengerHuntState[2] === F
</script>

<div id="sixth-screen" class="flex-column" in:fade>
    <div class="spacer" />
    <p class="font-family-primary-fat font-size-100">How many milligrams of anakinra does mom need?</p>
    <AnswerForm action={validateS6AnswerKey}>
        <p slot="errorMessage" class="margin-horizontal-auto">incorrect dosage</p>
        <MultiDigitInput
            description="enter mg of anakinra"
            label="anakinra"
            name={answerKey}
            testid="mg-mom-needs-input" />
    </AnswerForm>
    <details>
        <summary>show phone vibration audio player</summary>
        <audio
            controls
            loop
            class="margin-auto"
            src="https://cdn.pixabay.com/download/audio/2021/08/09/audio_a4637e27f0.mp3?filename=smartphone_vibrating_alarm_silent-7040.mp3"
            bind:paused={$phoneRingtonePaused}
            bind:volume={$audioVolume}
            on:canplay={() => {
                if (momCalling) $phoneRingtonePaused = false
            }} />
        {#if browser}
            <Slider
                bind:value={$audioVolume}
                name={audioVolumeKey}
                max={0.5}
                description="audio volume"
                label="phone vibration audio volume"
                on:change={() => $cookiesAllowed && setJSCookie(audioVolumeKey, String($audioVolume))} />
        {/if}
    </details>
</div>

<style>
    #sixth-screen {
        max-height: calc(100vh - var(--static-scale-300));
        padding: 1em 0.5em;
        overflow-y: auto;
    }
    #sixth-screen > :global(form > .button) {
        margin-top: 1em;
    }
    #sixth-screen :global(form) {
        margin-bottom: auto;
    }
    .spacer {
        /* the spacer exist to make form centered visually horizontally, as it matches the 1em height of the details element when it's not open */
        height: 1em;
    }
    p {
        margin-top: auto;
    }
</style>
