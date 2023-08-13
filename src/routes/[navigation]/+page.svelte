<script lang="ts">
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
    import { locale } from "svelte-intl-precompile"
    import { t } from "svelte-intl-precompile"

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
    import { dialUpAudioCurrentTime, dialUpAudioPaused } from "$stores/states/dialUpAudio"
    import { firstVisit, firstVisitKey } from "$stores/states/firstVisit"
    import { darkMode, darkModeKey } from "$stores/settings/darkMode"
    import { likesEightBitFont, likesEightBitFontKey } from "$stores/settings/likesEightBitFont"
    import { navigationState, navigationStateKey, NavigationSchema } from "$stores/states/navigation"
    import { phoneRingtonePaused } from "$stores/states/phone"
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

    $: if (browser) document.documentElement.lang = $locale

    $: if (browser) window.document.body.dataset.darkMode = String($darkMode)
    $: if (browser) window.document.body.dataset.eightBitFont = String($likesEightBitFont)
</script>

<svelte:head>
    <title>Felix Tjernberg's spot on the interconnected highway for bits</title>
    <meta name="description" content={$t("description")} />
    <link
        as="audio"
        href="https://cdn.pixabay.com/download/audio/2021/08/09/audio_a4637e27f0.mp3?filename=smartphone_vibrating_alarm_silent-7040.mp3"
        rel="preload"
        type="audio/mpeg" />
    <link
        as="audio"
        href="https://incompetech.com/music/royalty-free/mp3-royaltyfree/Local%20Forecast.mp3"
        rel="preload"
        type="audio/mpeg" />
    <link
        as="audio"
        href="https://www.soundjay.com/communication/sounds/dial-up-modem-01.mp3"
        rel="preload"
        type="audio/mpeg" />
</svelte:head>

<audio
    bind:paused={$phoneRingtonePaused}
    bind:volume={$audioVolume}
    src="https://cdn.pixabay.com/download/audio/2021/08/09/audio_a4637e27f0.mp3?filename=smartphone_vibrating_alarm_silent-7040.mp3" />
<audio
    bind:currentTime={$dialUpAudioCurrentTime}
    bind:paused={$dialUpAudioPaused}
    bind:volume={$audioVolume}
    src="https://www.soundjay.com/communication/sounds/dial-up-modem-01.mp3" />

{#if !$firstVisit && $navigationExplainer && $navigationState !== NavigationSchema.enum.navigation}
    <CloseableNotification bind:active={$navigationExplainer} booleanName={navigationExplainerKey} booleanValue="false">
        <span class="flex-wrap-center gap" style="--gap-size: 0.3em">
            Pressing <NavigationIcon /> icon opens navigation
        </span>
        <span class="flex-wrap-center gap" style="--gap-size: 0.3em">
            Pressing <SettingsIcon /> icon opens settings
        </span>
        <span class="text-decoration-underline">Press these notifications to close/hide them</span>
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
        <span class="text-decoration-underline">Press these notifications to close/hide them</span>
    </CloseableNotification>
{/if}

<NavigationWrapper bind:navigationActive>
    <CoachSection slot="coach" />
    <ComputerSection slot="computer" />
    <ContactSection slot="contact" />
    <PhoneSection slot="phone" />
</NavigationWrapper>

{#if !navigationActive}
    {#if $cookiesAllowed}
        <Button
            id="navigation-button"
            href="/navigation"
            label="Open navigation"
            on:click={() => ($navigationState = NavigationSchema.enum.navigation)}>
            <NavigationIcon slot="icon" />
        </Button>
    {:else}
        <form id="navigation-form" on:submit={() => ($navigationState = NavigationSchema.enum.navigation)}>
            <HiddenInputs excludeStates={[navigationStateKey]} />
            <Button label="Open navigation" name={navigationStateKey} value={NavigationSchema.enum.navigation}>
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

<FirstTimeVisitOverlay />
<SettingsOverlay />

<style>
    #settings-form,
    #navigation-form,
    :global(#navigation-button) {
        position: fixed !important;
        top: 1em;
        width: max-content;
    }
    #settings-form,
    :global(#settings-form svg),
    #navigation-form,
    :global(#navigation-form svg),
    :global(#navigation-button) {
        font-size: var(--static-scale-400) !important;
    }
    :global(#navigation-button),
    #navigation-form {
        left: 1em;
    }
    #settings-form {
        right: 1em;
    }
</style>
