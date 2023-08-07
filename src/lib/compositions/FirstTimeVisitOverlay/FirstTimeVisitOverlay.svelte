<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import DetailsContent from "./DetailsContent.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"

    import { enhance } from "$app/forms"
    import { scale } from "svelte/transition"

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
    import BaseSettings from "$compositions/BaseSettings/BaseSettings.svelte"

    let details: HTMLDetailsElement

    let detailsOpen: boolean = false
</script>

{#if $firstVisit}
    <dialog open={true} id="first-time-visit-dialog" class="relative background-blur" transition:scale>
        <h2 class="visually-hidden">First Time Visit Dialog</h2>
        <div
            id="first-time-visit-box"
            class="background-blur margin-auto margin-vertical-flow margin glow flex-column-center">
            {#if !$decidedOnCookies}
                <details class="margin-vertical-flow flex-column-center" bind:open={detailsOpen} bind:this={details}>
                    <summary tabindex="-1" class="font-family-primary-fat text-align-center">
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
                <p class="font-family-primary-fat text-align-center">
                    Before you explore my page here I would like you to set some preferences
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
                        <HiddenInputs
                            excludeStates={[firstVisitKey, navigationExplainerKey, navigationExplainer2Key]} />
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
        </div>
    </dialog>
{/if}

<style>
    details {
        cursor: pointer;
        max-height: 10em;
        overflow-y: auto;
        text-align: left;
    }
    #first-time-visit-dialog {
        background-color: transparent;
        background-image: var(--gradient-90-percent);
        max-height: 100%;
    }
    #first-time-visit-dialog[open] {
        display: grid;
    }
    :global(#first-time-visit-dialog .icon) {
        font-size: var(--relative-scale-300);
    }
    #first-time-visit-dialog,
    #first-time-visit-box {
        --background-blur-amount: 7px;
    }
    #first-time-visit-box {
        max-width: 1000px;
        height: max-content;
        --glow-color: var(--gray-100);
        --margin-vertical-flow-amount: var(--relative-scale-400);
        border: var(--stroke-300) solid var(--gray-100);
        overflow-x: hidden;
        overflow-y: auto;
        padding: var(--static-scale-300);
    }
    :global([data-dark-mode="false"] #first-time-visit-box) {
        background-color: var(--white-50-percent);
    }
</style>
