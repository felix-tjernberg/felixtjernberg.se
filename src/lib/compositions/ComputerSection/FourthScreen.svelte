<script lang="ts">
    // @ts-ignore TODO check library does have types?
    import YouTube from "svelte-youtube"
    import AnswerForm from "./AnswerForm.svelte"
    import MultiDigitInput from "$components/MultiDigitInput/MultiDigitInput.svelte"

    import { fade } from "svelte/transition"

    import { answerKey } from "./formKeys"
    import { audioVolume } from "$stores/settings/audioVolume"

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
        <AnswerForm actionName="validateFourthScreenAnswer">
            <p slot="errorMessage" class="margin-horizontal-auto">incorrect number of seconds</p>
            <MultiDigitInput
                label="Number of seconds"
                description="Enter number of seconds"
                name={answerKey}
                testid="song-number-input" />
        </AnswerForm>
    </div>
</div>

<style>
    #forth-screen > :global(div:first-of-type) {
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
    #forth-screen :global(form > .button) {
        margin-top: 1em;
    }
</style>
