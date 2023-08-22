<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"

    import { browser } from "$app/environment"
    import { enhance } from "$app/forms"
    import { goto } from "$app/navigation"
    import { page } from "$app/stores"

    import { answerFormKey } from "./answerFormKeys"
    import { cookiesAllowed, decidedOnCookiesKey } from "$stores/settings/cookiesAllowed"
    import { firstVisitKey } from "$stores/states/firstVisit"
    import { JSActiveKey } from "$utilities/JSActiveKey"
    import { scavengerHuntState, scavengerHuntStateKey } from "$stores/states/scavengerHuntState"

    export let action: string
    export let label: string = "Submit answer"

    let error: boolean = false
    let processing: boolean = false
</script>

<form
    action={`?/${action}`}
    method="POST"
    class="flex-column margin-horizontal-auto"
    data-sveltekit-keepfocus
    use:enhance={() => {
        processing = true
        return async ({ result }) => {
            // TODO handle if newState is undefined, however this is a super rare case when for some reason the packets are lost or damaged in transit
            // @ts-ignore
            if (result.type === "success") $scavengerHuntState = result?.data?.newState
            if (result.type === "failure") error = true

            if (!$cookiesAllowed && result.type === "redirect") {
                goto(result.location)
                const url = new URL(result.location, window.location.origin)
                // TODO  handle if searchParams[scavengerHuntStateKey] is null, however this is a super rare case when for some reason the packets are lost or damaged in transit
                // @ts-ignore
                $scavengerHuntState = url.searchParams.get(scavengerHuntStateKey)?.toString()
            }

            processing = false
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
    <Button disabled={processing} {label} loadingDots={true} class="margin-horizontal-auto" type="submit" />
</form>
