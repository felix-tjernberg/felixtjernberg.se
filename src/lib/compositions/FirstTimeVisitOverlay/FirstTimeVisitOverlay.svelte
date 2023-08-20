<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import BaseSettings from "$compositions/BaseSettings/BaseSettings.svelte"
    import DetailsContent from "./DetailsContent.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"
    import Overlay from "$components/Overlay/Overlay.svelte"
    import WelcomeText from "$assets/svgs/WelcomeText.svelte"

    import { enhance } from "$app/forms"

    import {
        cookiesAllowed,
        cookiesAllowedKey,
        decidedOnCookies,
        decidedOnCookiesKey,
    } from "$stores/settings/cookiesAllowed"
    import { firstVisit, firstVisitKey } from "$stores/states/firstVisit"
    import { setJSCookie } from "$utilities/setJSCookie"
    import {
        navigationExplainer,
        navigationExplainer2,
        navigationExplainer2Key,
        navigationExplainerKey,
    } from "$stores/states/navigation"
    import { booleanNameKey, valueKey } from "$utilities/toggleBooleanKeys"

    let details: HTMLDetailsElement

    let detailsOpen: boolean = false
</script>

{#if $firstVisit}
    <Overlay headerText="Welcome!" bind:open={$firstVisit} closeButton={false}>
        <WelcomeText slot="headerTextSVG" />
        {#if !$decidedOnCookies}
            <h2 class="font-family-3d font-size-200">Welcome to my spot on the interwebs</h2>
            <details class="margin-vertical-flow flex-column-center" bind:open={detailsOpen} bind:this={details}>
                <summary tabindex="-1" class="font-family-primary-fat text-align-center font-size-100">
                    Are you ok with me saving some things about you between page visits?
                    <br />
                    <span class="font-family-primary-thin font-size-100 text-decoration-underline">
                        Click here to read how cookies are managed
                    </span>
                </summary>
                {#if detailsOpen}
                    <DetailsContent {details} {detailsOpen} />
                {/if}
            </details>
            <div class="flex-center font-size-000 gap">
                <form
                    on:submit={() => {
                        $cookiesAllowed = false
                        $decidedOnCookies = true
                    }}>
                    <HiddenInputs excludeStates={[cookiesAllowedKey, decidedOnCookiesKey]} />
                    <input type="hidden" name={decidedOnCookiesKey} value="true" />
                    <Button label="Decline cookies" name={cookiesAllowedKey} value="false" />
                </form>
                <form
                    action="?/allowCookies"
                    method="POST"
                    use:enhance={() => {
                        return async () => {
                            $cookiesAllowed = true
                            $decidedOnCookies = true
                        }
                    }}>
                    <Button label="Allow essential cookies" />
                </form>
            </div>
        {:else}
            <h2 class="font-family-3d font-size-200">Before you explore my page</h2>
            <p class="font-family-primary-fat text-align-center font-size-000">
                I would like you to set some preferences
            </p>
            <BaseSettings />
            {#if $cookiesAllowed}
                <form
                    action="?/toggleBoolean"
                    method="POST"
                    use:enhance={({ cancel }) => {
                        cancel()
                        $navigationExplainer = true
                        $navigationExplainer2 = true
                        if ($cookiesAllowed) setJSCookie(firstVisitKey, "false")
                        $firstVisit = false
                    }}>
                    <input type="hidden" name={booleanNameKey} value={firstVisitKey} />
                    <Button
                        name={valueKey}
                        value="false"
                        id="close-first-time-visit-dialog"
                        label="I'm ready to explore!"
                        testid="close-first-time-visit-dialog" />
                </form>
            {:else}
                <form
                    on:submit={() => {
                        $navigationExplainer = true
                        $navigationExplainer2 = true
                        $firstVisit = false
                    }}>
                    <HiddenInputs excludeStates={[firstVisitKey, navigationExplainerKey, navigationExplainer2Key]} />
                    <input type="hidden" name={navigationExplainerKey} value="true" />
                    <input type="hidden" name={navigationExplainer2Key} value="true" />
                    <Button
                        name={firstVisitKey}
                        value="false"
                        id="close-first-time-visit-dialog"
                        label="I'm ready to explore!"
                        testid="close-first-time-visit-dialog" />
                </form>
            {/if}
        {/if}
    </Overlay>
{/if}

<style>
    details {
        cursor: pointer;
        max-height: 10em;
        overflow-y: auto;
        text-align: left;
    }
</style>
