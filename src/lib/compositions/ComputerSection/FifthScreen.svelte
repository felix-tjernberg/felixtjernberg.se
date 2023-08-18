<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import Coach from "$components/Coach/Coach.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"
    import SingleDigitInput from "$components/SingleDigitInput/SingleDigitInput.svelte"

    import { browser } from "$app/environment"
    import { fade } from "svelte/transition"
    import { enhance } from "$app/forms"
    import { goto } from "$app/navigation"
    import { page } from "$app/stores"

    import { answerFormKey, answerKey } from "./formKeys"
    import { cookiesAllowed, decidedOnCookiesKey } from "$stores/settings/cookiesAllowed"
    import { firstVisitKey } from "$stores/states/firstVisit"
    import { JSActiveKey } from "$utilities/JSActiveKey"
    import { scavengerHuntState, scavengerHuntStateKey } from "$stores/states/scavengerHuntState"

    let error: boolean = false
</script>

<div id="fifth-screen" class="flex-column relative" in:fade>
    <Coach />
    <div id="fifth-screen-content" class="margin-vertical-auto">
        <p class="font-family-primary-fat font-size-100 text-transform-capitalize">
            How many years did <br />
            Felix Tjernberg <br />
            coach american football?
        </p>
        <form
            action="?/validateFifthScreenAnswer"
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
                <p class="font-primary-fat margin-horizontal-auto">Incorrect number of years</p>
            {/if}
            <SingleDigitInput name={answerKey} label="years felix coached" testid="coach-years-number-input" />
            <Button label="Submit answer" class="margin-horizontal-auto" type="submit" />
        </form>
    </div>
</div>

<style>
    #fifth-screen-content {
        overflow-y: auto;
    }
    #fifth-screen {
        max-height: calc(100vh - var(--static-scale-300));
        padding: 1em 0.5em;
        overflow: hidden;
    }
    :global(#fifth-screen > :nth-child(1)) {
        opacity: 0.337;
    }
</style>
