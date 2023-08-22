<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import BaseSettings from "$compositions/BaseSettings/BaseSettings.svelte"
    import CookieDetailsContent from "./CookieDetailsContent.svelte"
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
    let detailsOpen = false
</script>

{#if $firstVisit}
    <Overlay headerText="Welcome!" bind:open={$firstVisit} closeButton={false}>
        <WelcomeText slot="headerTextSVG" />
        {#if !$decidedOnCookies}
            <h2 class="font-family-3d font-size-200">Welcome to my spot on the interwebs</h2>
            <details class="margin-vertical-flow flex-column-center" bind:this={details} bind:open={detailsOpen}>
                <summary class="font-family-primary-fat text-align-center font-size-100" style="line-height: 1.2">
                    Are you ok with saving your application state in cookies?
                    <br />
                    <span class="font-family-primary-thin font-size-100 text-decoration-underline">
                        Click here to read how cookies are managed
                    </span>
                </summary>
                <CookieDetailsContent {details} {detailsOpen} />
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
                    <Button label="Allow functional cookies" />
                </form>
            </div>
        {:else}
            <h2 class="font-family-3d font-size-200">Before you explore my page</h2>
            <p class="font-family-primary-fat text-align-center font-size-000">
                I would like you to set some preferences
            </p>
            <BaseSettings />
            <details>
                <summary>read keyboard accessability concerns</summary>
                I have tried my best to make this page keyboard navigatable <br /><br />
                However because this website uses some unorthodox css, which means that you can get in a state where content
                is not correctly placed on the screen <br /><br />
                If you are using firefox the css selector :has is not supported which means keyboard navigation is very broken,
                :has selector is
                <a
                    href="https://connect.mozilla.org/t5/ideas/when-is-has-css-selector-going-to-be-fully-implemented-in/idc-p/37339/highlight/true#M21675"
                    >planned to be completed in 2023 because of the interop initiative</a>
                <br /><br />
                If this happens reloading the page might help in some cases, but if it does not help please feel free to
                contact me :)
            </details>
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
