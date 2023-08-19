<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"

    import { browser } from "$app/environment"
    import { enhance } from "$app/forms"
    import { goto } from "$app/navigation"
    import { page } from "$app/stores"

    import { answerFormKey } from "./formKeys"
    import { cookiesAllowed, decidedOnCookiesKey } from "$stores/settings/cookiesAllowed"
    import { firstVisitKey } from "$stores/states/firstVisit"
    import { JSActiveKey } from "$utilities/JSActiveKey"
    import { scavengerHuntState, scavengerHuntStateKey } from "$stores/states/scavengerHuntState"

    export let actionName: string
    export let label: string = "Submit answer"

    let error: boolean = false
</script>

<form
    action={`?/${actionName}`}
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
    {#if $page.form?.formName === answerFormKey || error || $page.url.searchParams.get("error") === "true"}
        <slot name="errorMessage" />
    {:else}
        <slot name="question" />
    {/if}
    <slot />
    <Button {label} class="margin-horizontal-auto" type="submit" />
</form>
