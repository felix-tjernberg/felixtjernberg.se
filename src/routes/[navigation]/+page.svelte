<script lang="ts">
    import BlogSection from "$compositions/BlogSection/BlogSection.svelte"
    import Button from "$components/Button/Button.svelte"
    import CoachSection from "$compositions/CoachSection/CoachSection.svelte"
    import ComputerSection from "$compositions/ComputerSection/ComputerSection.svelte"
    import ContactSection from "$compositions/ContactSection/ContactSection.svelte"
    import FirstTimeVisitOverlay from "$compositions/FirstTimeVisitOverlay/FirstTimeVisitOverlay.svelte"
    import NavigationIcon from "$assets/svgs/NavigationIcon.svelte"
    import NavigationWrapper from "$compositions/NavigationWrapper/NavigationWrapper.svelte"
    import CloseableNotification from "$components/Notification/CloseableNotification.svelte"
    import PhoneSection from "$compositions/PhoneSection/PhoneSection.svelte"
    import SettingsIcon from "$assets/svgs/SettingsIcon.svelte"
    import SettingsOverlay from "$compositions/SettingsOverlay/SettingsOverlay.svelte"

    import { browser } from "$app/environment"
    import { enhance } from "$app/forms"

    import { audioVolume, audioVolumeKey } from "$stores/settings/audioVolume"
    import {
        cookiesAllowed,
        cookiesAllowedKey,
        decidedOnCookies,
        decidedOnCookiesKey,
    } from "$stores/settings/cookiesAllowed"
    import {
        navigationExplainer,
        navigationExplainer2,
        navigationExplainerKey,
        navigationExplainer2Key,
    } from "$stores/states/navigation"
    import type { DataBasedOnCookies, DataBasedOnDefaults } from "./+page.server"
    import { firstVisit, firstVisitKey } from "$stores/states/firstVisit"
    import { darkMode, darkModeKey } from "$stores/settings/darkMode"
    import { likesEightBitFont, likesEightBitFontKey } from "$stores/settings/likesEightBitFont"
    import { navigationState, navigationStateKey, NavigationSchema } from "$stores/states/navigation"
    import { scavengerHuntState, scavengerHuntStateKey } from "$stores/states/scavengerHuntState"
    import { settingsOpen, settingsOpenKey } from "$stores/states/settingsOpen"
    import { setJSCookie } from "$utilities/setJSCookie"
    import HiddenInputs from "$components/HiddenInputs.svelte"
    import { booleanNameKey, valueKey } from "$utilities/toggleBooleanKeys"

    export let data: DataBasedOnCookies | DataBasedOnDefaults

    // Initialize website state
    $audioVolume = data[audioVolumeKey]
    $cookiesAllowed = data[cookiesAllowedKey]
    $darkMode = data[darkModeKey]
    $decidedOnCookies = data[decidedOnCookiesKey]
    $firstVisit = data[firstVisitKey]
    $likesEightBitFont = data[likesEightBitFontKey]
    $navigationExplainer = data[navigationExplainerKey]
    $navigationExplainer2 = data[navigationExplainer2Key]
    $navigationState = data[navigationStateKey]
    $scavengerHuntState = data[scavengerHuntStateKey]
    $settingsOpen = data[settingsOpenKey]

    let navigationActive: boolean

    $: navigationButtonFlashing =
        ($scavengerHuntState[0] === "5" && $navigationState === NavigationSchema.enum.computer) ||
        ($scavengerHuntState[0] === "6" &&
            $scavengerHuntState[3] > "3" &&
            $navigationState === NavigationSchema.enum.phone)

    $: if (browser) window.document.body.dataset.darkMode = String($darkMode)
    $: if (browser) window.document.body.dataset.eightBitFont = String($likesEightBitFont)
</script>

<FirstTimeVisitOverlay />
<SettingsOverlay />

{#if !$firstVisit && $navigationExplainer && $navigationState !== NavigationSchema.enum.navigation}
    <CloseableNotification bind:active={$navigationExplainer} booleanName={navigationExplainerKey} booleanValue="false">
        <span class="navigation-explainer1 flex-wrap-center gap" style="--gap-size: 0.5em">
            Pressing <NavigationIcon /> <span class="visually-hidden">icon</span> opens navigation
        </span>
        <br />
        <span class="navigation-explainer1 flex-wrap-center gap" style="--gap-size: 0.5em">
            Pressing <SettingsIcon /> <span class="visually-hidden">icon</span> opens settings
        </span>
        <br />
        <span class="text-decoration-underline">Press these notifications to close them</span>
    </CloseableNotification>
{/if}
{#if !$firstVisit && $navigationExplainer2 && $navigationState === NavigationSchema.enum.navigation}
    <CloseableNotification
        bind:active={$navigationExplainer2}
        booleanName={navigationExplainer2Key}
        booleanValue="false">
        <span class="flex-wrap-center gap" style="--gap-size: 0.3em">
            Pressing one of the sections navigates to them
        </span>
        <br />
        <span class="text-decoration-underline">Press these notifications to close them</span>
    </CloseableNotification>
{/if}

<NavigationWrapper bind:navigationActive>
    <CoachSection slot="coach" />
    <ComputerSection slot="computer" />
    <ContactSection slot="contact" />
    <PhoneSection slot="phone" />
    <BlogSection slot="blog" />
</NavigationWrapper>

{#if !navigationActive}
    {#if $cookiesAllowed}
        <Button
            id="navigation-button"
            href="/navigation"
            label="Open navigation"
            flashing={navigationButtonFlashing}
            on:click={() => ($navigationState = NavigationSchema.enum.navigation)}>
            <NavigationIcon slot="icon" />
        </Button>
    {:else}
        <form id="navigation-form" on:submit={() => ($navigationState = NavigationSchema.enum.navigation)}>
            <HiddenInputs excludeStates={[navigationStateKey]} />
            <Button
                flashing={navigationButtonFlashing}
                label="Open navigation"
                name={navigationStateKey}
                value={NavigationSchema.enum.navigation}>
                <NavigationIcon slot="icon" />
            </Button>
        </form>
    {/if}
{/if}
{#if $cookiesAllowed}
    <form
        id="settings-form"
        action="?/toggleBoolean"
        method="POST"
        use:enhance={({ cancel }) => {
            cancel()
            if ($cookiesAllowed) setJSCookie(settingsOpenKey, "true")
            $settingsOpen = true
        }}>
        <input type="hidden" name={booleanNameKey} value={settingsOpenKey} />
        <Button label="Open settings" name={valueKey} value="true">
            <SettingsIcon slot="icon" />
        </Button>
    </form>
{:else}
    <form id="settings-form" on:submit={() => ($settingsOpen = true)}>
        <HiddenInputs excludeStates={[settingsOpenKey]} />
        <Button label="Open settings" name={settingsOpenKey} value="true">
            <SettingsIcon slot="icon" />
        </Button>
    </form>
{/if}

<style>
    span.navigation-explainer1 :global(svg) {
        margin: 0;
    }
</style>
