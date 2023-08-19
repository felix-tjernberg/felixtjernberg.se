<script lang="ts">
    // @ts-ignore TODO check library does have types?
    import YouTube from "svelte-youtube"
    import Button from "$components/Button/Button.svelte"
    import MultiDigitInput from "$components/MultiDigitInput/MultiDigitInput.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"

    import { browser } from "$app/environment"
    import { enhance } from "$app/forms"
    import { fade } from "svelte/transition"
    import { goto } from "$app/navigation"
    import { page } from "$app/stores"

    import { answerFormKey, numberOfSecondsKey } from "./formKeys"
    import { audioVolume } from "$stores/settings/audioVolume"
    import { cookiesAllowed, decidedOnCookiesKey } from "$stores/settings/cookiesAllowed"
    import { firstVisitKey } from "$stores/states/firstVisit"
    import { JSActiveKey } from "$utilities/JSActiveKey"
    import { scavengerHuntState, scavengerHuntStateKey } from "$stores/states/scavengerHuntState"

    let error: boolean = false

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
        <form
            action="?/validateFourthScreenAnswer"
            method="POST"
            class="flex-column margin-horizontal-auto"
            use:enhance={() => {
                // TODO move this async function to separate file as it is used in multiple places
                return async (result) => {
                    // TODO handle if newState is undefined, however this is a super rare case when for some reason the packets are lost or damaged in transit
                    // @ts-ignore
                    if (result.result.type === "success") $scavengerHuntState = result?.result?.data?.newState
                    if (result.result.type === "failure") error = true

                    if (!$cookiesAllowed && result.result.type === "redirect") {
                        goto(result.result.location)
                        const url = new URL(result.result.location, window.location.origin)
                        // TODO  handle if searchParams[scavengerHuntStateKey] is null, however this is a super rare case when for some reason the packets are lost or damaged in transit
                        // @ts-ignore
                        $scavengerHuntState = url.searchParams.get(scavengerHuntStateKey)?.toString()
                    }
                }
            }}>
            {#if !$cookiesAllowed}
                <HiddenInputs excludeStates={[decidedOnCookiesKey, firstVisitKey]} />
            {/if}
            <input type="hidden" name={JSActiveKey} value={browser} />
            {#if $page.form?.formName === answerFormKey || error || $page.url.searchParams.get("error")}
                <p class="font-primary-fat margin-horizontal-auto">Incorrect number of seconds</p>
            {/if}
            <MultiDigitInput
                label="Number of seconds"
                description="Enter number of seconds"
                name={numberOfSecondsKey}
                testid="song-number-input" />
            <Button label="Submit answer" class="margin-horizontal-auto" type="submit" />
        </form>
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
    #forth-screen :global(form > .button) {
        margin-top: 1em;
    }
</style>
