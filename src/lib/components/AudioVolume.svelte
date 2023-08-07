<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"
    import Slider from "$components/Slider/Slider.svelte"

    import { audioVolume, audioVolumeKey } from "$stores/settings/audioVolume"
    import { cookiesAllowed, decidedOnCookies } from "$stores/settings/cookiesAllowed"
    import { firstVisit } from "$stores/states/firstVisit"
    import { setJSCookie } from "$utilities/setJSCookie"

    let noScriptVolumeForm: HTMLFormElement
    let elevatorMusicPaused = true
</script>

<div class="flex-column-center">
    {#if $cookiesAllowed}
        <form class="flex-column-center" action="?/setDefaultAudioVolume" method="POST" on:submit|preventDefault>
            <Slider
                bind:value={$audioVolume}
                name={audioVolumeKey}
                max={0.5}
                description="Set the elevator music volume to a comfortable level please :)"
                noScriptDescription="This slider sets your default volume, however this setting only works when JavaScript is enabled"
                label="Elevator music volume"
                on:change={() => $cookiesAllowed && setJSCookie(audioVolumeKey, String($audioVolume))} />
            <!-- TODO parse this before setting cookie, probably needs to for all other setJSCookie invocations -->
            <noscript>
                <Button label="Set default volume" />
            </noscript>
        </form>
    {:else}
        <form class="flex-column-center" bind:this={noScriptVolumeForm}>
            <Slider
                bind:value={$audioVolume}
                name={audioVolumeKey}
                max={0.5}
                description="Set the elevator music volume to a comfortable level please :)"
                noScriptDescription="This slider sets your default volume, however this setting only works when JavaScript is enabled"
                label="Elevator music volume"
                on:change={() => noScriptVolumeForm.requestSubmit()} />
            <HiddenInputs excludeStates={[audioVolumeKey]} />
            <noscript>
                <Button label="Set default volume" />
            </noscript>
        </form>
    {/if}
    <details class="flex-column-center">
        <summary class="text-decoration-underline"> Show elevator music audio player</summary>
        <audio
            bind:paused={elevatorMusicPaused}
            bind:volume={$audioVolume}
            on:canplay={() => (elevatorMusicPaused = $firstVisit && $decidedOnCookies ? false : true)}
            class="margin-auto"
            controls
            src="https://incompetech.com/music/royalty-free/mp3-royaltyfree/Local%20Forecast.mp3" />
    </details>
</div>
