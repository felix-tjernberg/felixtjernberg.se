<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"
    import SingleDigitInput from "$components/SingleDigitInput/SingleDigitInput.svelte"

    import { browser } from "$app/environment"
    import { enhance } from "$app/forms"
    import { goto } from "$app/navigation"
    import { page } from "$app/stores"

    import { cookiesAllowed, decidedOnCookiesKey } from "$stores/settings/cookiesAllowed"
    import { firstVisitKey } from "$stores/states/firstVisit"
    import { scavengerHuntState, scavengerHuntStateKey } from "$stores/states/scavengerHuntState"
    import { JSActiveKey } from "$utilities/JSActiveKey"
    import { pinFormKey } from "./formKeys"

    let error: boolean = false
</script>

<div id="first-screen" class="height-100percent flex">
    <div id="top-left" class="absolute">
        <p><span class="visually-hidden">corner number 1: </span>1000</p>
    </div>
    <div id="top-right" class="absolute">
        <p><span class="visually-hidden">corner number 2: </span>200</p>
    </div>
    <div id="bottom-left" class="absolute">
        <p><span class="visually-hidden">corner number 3: </span>30</p>
    </div>
    <div id="bottom-right" class="absolute">
        <p><span class="visually-hidden">corner number 4: </span>4</p>
    </div>
    <form
        action="?/validateFirstScreenAnswer"
        method="POST"
        id="content"
        class="margin-vertical-auto margin-horizontal width-100percent padding-vertical"
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
        {#if $page.form?.formName === pinFormKey || error || $page.url.searchParams.get("error")}
            <p class="font-family-primary-fat line-height-1" style="line-height:1.2">
                invalid<br /> pin code<br />try again
            </p>
        {:else}
            <p class="font-family-primary-fat line-height-1">enter pin</p>
        {/if}
        <div class="flex-center">
            <SingleDigitInput label="pin number 1" testid="pin-input" name="pin1" value={1} />
            <SingleDigitInput label="pin number 2" testid="pin-input" name="pin2" value={2} />
            <SingleDigitInput label="pin number 3" testid="pin-input" name="pin3" value={3} />
            <SingleDigitInput label="pin number 4" testid="pin-input" name="pin4" value={4} />
        </div>
        {#if !$cookiesAllowed}
            <HiddenInputs excludeStates={[decidedOnCookiesKey, firstVisitKey]} />
        {/if}
        <input type="hidden" name={JSActiveKey} value={browser} />
        <Button label="log in" class="margin-auto" type="submit" />
    </form>
</div>

<style>
    #content {
        max-height: 100vh;
        overflow-y: auto;
    }
    #top-right {
        rotate: 6.66deg;
    }
    #bottom-left {
        rotate: 6.9deg;
    }
    #bottom-right {
        rotate: -7.2deg;
    }
    #bottom-left,
    #bottom-right {
        bottom: 0;
    }
    #top-right,
    #bottom-right {
        right: 0;
    }
    #top-left,
    #top-right {
        top: 0;
    }
    #top-left,
    #bottom-left {
        left: 0;
    }
    @media (min-height: 400px) and (min-width: 400px) {
        #bottom-left,
        #bottom-right {
            bottom: 1em;
        }
        #top-right,
        #bottom-right {
            right: 1em;
        }
        #top-left,
        #top-right {
            top: 1em;
        }
        #top-left,
        #bottom-left {
            left: 1em;
        }
    }
</style>
