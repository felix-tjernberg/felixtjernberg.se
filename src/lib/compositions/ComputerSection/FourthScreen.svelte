<script lang="ts">
    // @ts-ignore TODO check library does have types?
    import YouTube from "svelte-youtube"
    import Button from "$components/Button/Button.svelte"
    import MultiDigitInput from "$components/MultiDigitInput/MultiDigitInput.svelte"

    import { fade } from "svelte/transition"
    import { audioVolume } from "$stores/settings/audioVolume"

    let value: number
    let input: HTMLInputElement

    function ready(event: CustomEvent) {
        event.detail.target.setVolume($audioVolume * 100)
    }
</script>

<div id="forth-screen" class="flex-column gap" in:fade>
    <!-- TODO add more YouTube options https://github.com/PandaWhisperer/svelte-youtube -->
    <YouTube videoId="pgJXHhmN45Y" on:ready={ready} />
    <div class="padding-horizontal flex-column gap" style="--padding-amount: 2em;">
        <p
            class="font-family-primary-fat font-size-100 tex-transform-capitalize margin-horizontal-auto padding-horizontal"
            style="--padding-amount: 10px">
            How many seconds is my friends song?<br />
            <span class="font-family-primary-thin">(the music animation is my creation)</span>
        </p>
        <MultiDigitInput
            label="answer"
            description="Enter number of seconds"
            bind:value
            bind:input
            testid="song-number-input" />
        <Button label="Submit answer" class="margin-horizontal-auto" type="submit" />
    </div>
</div>

<style>
    #forth-screen > :global(div:first-of-type) {
        /* margin: auto auto 0 auto; */
        display: contents;
    }
    #forth-screen :global(iframe) {
        margin: auto;
        aspect-ratio: 16 / 9;
        max-height: 50%;
        max-width: 95%;
    }
    #forth-screen {
        max-height: calc(100vh - var(--static-scale-300));
        overflow-y: auto;
        padding-top: 1em;
    }
    #forth-screen > div:last-of-type {
        padding-bottom: 1em;
    }
</style>
