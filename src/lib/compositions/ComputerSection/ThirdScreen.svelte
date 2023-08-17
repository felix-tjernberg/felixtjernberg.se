<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import TextInput from "$components/TextInput/TextInput.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"

    import { browser } from "$app/environment"
    import { page } from "$app/stores"
    import { enhance } from "$app/forms"
    import { fade } from "svelte/transition"
    import { goto } from "$app/navigation"

    import { answerKey, answerFormKey } from "./formKeys"
    import { cookiesAllowed, decidedOnCookiesKey } from "$stores/settings/cookiesAllowed"
    import { firstVisitKey } from "$stores/states/firstVisit"
    import { JSActiveKey } from "$utilities/JSActiveKey"
    import { scavengerHuntState, scavengerHuntStateKey } from "$stores/states/scavengerHuntState"

    let error: boolean = false
</script>

<div id="third-screen" class="flex-column height-100percent" in:fade>
    <p class="font-family-primary-fat padding-horizontal text-transform-capitalize">
        Are you ready to start the scavenger hunt?
    </p>
    <form
        action="?/validateScreenTwoAnswer"
        method="POST"
        class="flex-column margin-horizontal-auto"
        use:enhance={() => {
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
            <p class="font-primary-fat margin-horizontal-auto">That's not the word yes!</p>
        {/if}
        <TextInput
            name={answerKey}
            label="answer"
            placeholder={'type "yes" here'}
            testid="start-scavenger-hunt-text-input" />
        <Button label="Submit answer" class="margin-auto" type="submit" />
    </form>
</div>

<style>
    #third-screen {
        max-height: calc(100vh - var(--static-scale-300));
        overflow-y: auto;
    }
    #third-screen > p {
        margin-top: auto;
    }
    #third-screen > form {
        margin-bottom: auto;
    }
</style>
