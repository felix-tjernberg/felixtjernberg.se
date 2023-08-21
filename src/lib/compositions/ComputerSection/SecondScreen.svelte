<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import LoadingDots from "$components/LoadingDots.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"
    import Slider from "$components/Slider/Slider.svelte"

    import { browser } from "$app/environment"
    import { fade } from "svelte/transition"

    import { audioVolume, audioVolumeKey } from "$stores/settings/audioVolume"
    import { dialUpAudioCurrentTime, dialUpAudioPaused } from "$stores/states/dialUpAudio"
    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { setJSCookie } from "$utilities/setJSCookie"
    import {
        S3DefaultState,
        scavengerHuntState,
        scavengerHuntStateKey,
        updateScavengerHuntStateKey,
    } from "$stores/states/scavengerHuntState"

    $dialUpAudioCurrentTime = 0

    let noCookiesForm: HTMLFormElement
</script>

<div id="second-screen" class="flex-column height-100percent" transition:fade>
    <div class="margin-vertical-auto margin-vertical-flow padding-vertical">
        <p class="font-family-primary-fat"><span aria-hidden="true">...</span>Initializing<LoadingDots /></p>
        <details>
            <summary>show dial up audio player</summary>
            <audio
                controls
                class="margin-auto"
                src="https://www.soundjay.com/communication/sounds/dial-up-modem-01.mp3"
                bind:paused={$dialUpAudioPaused}
                bind:volume={$audioVolume}
                on:canplay={() => ($dialUpAudioPaused = false)}
                on:ended={() => {
                    if ($cookiesAllowed) {
                        setJSCookie(scavengerHuntStateKey, S3DefaultState)
                        $scavengerHuntState = S3DefaultState
                    } else noCookiesForm.submit()
                }} />
            {#if $cookiesAllowed}
                {#if !browser}
                    <form action={`?/${updateScavengerHuntStateKey}`} method="POST">
                        <Button
                            class="margin-horizontal-auto"
                            name={scavengerHuntStateKey}
                            value={S3DefaultState}
                            label="Go to next screen" />
                    </form>
                {/if}
            {:else}
                <form bind:this={noCookiesForm}>
                    <HiddenInputs excludeStates={[scavengerHuntStateKey]} />
                    {#if browser}
                        <input type="hidden" name={scavengerHuntStateKey} value={S3DefaultState} />
                    {:else}
                        <Button
                            class="margin-horizontal-auto"
                            name={scavengerHuntStateKey}
                            value={S3DefaultState}
                            label="Go to next screen" />
                    {/if}
                </form>
            {/if}
        </details>
        {#if browser}
            <Slider
                bind:value={$audioVolume}
                name={audioVolumeKey}
                max={0.5}
                description="audio volume"
                label="dial up audio volume"
                on:change={() => $cookiesAllowed && setJSCookie(audioVolumeKey, String($audioVolume))} />
        {/if}
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
    span[aria-hidden="true"] {
        opacity: 0;
    }
    @media (max-width: 500px) {
        span[aria-hidden="true"] {
            display: none;
        }
    }
</style>
