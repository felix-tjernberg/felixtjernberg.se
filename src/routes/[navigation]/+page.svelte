<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import CoachSection from "$compositions/CoachSection/CoachSection.svelte"
    import ComputerSection from "$compositions/ComputerSection/ComputerSection.svelte"
    import ContactSection from "$compositions/ContactSection/ContactSection.svelte"
    import FirstTimeVisitOverlay from "$compositions/FirstTimeVisitOverlay/FirstTimeVisitOverlay.svelte"
    import NavigationIcon from "$assets/svgs/NavigationIcon.svelte"
    import NavigationWrapper from "$compositions/NavigationWrapper/NavigationWrapper.svelte"
    import Notification from "$components/Notification/Notification.svelte"
    import PhoneSection from "$compositions/PhoneSection/PhoneSection.svelte"
    import SettingsIcon from "$assets/svgs/SettingsIcon.svelte"
    import SettingsOverlay from "$compositions/SettingsOverlay/SettingsOverlay.svelte"

    import { navigationState, navigationStateKey, NavigationSchema } from "$stores/states/navigation"
    import { audioVolume, audioVolumeKey } from "$stores/settings/audioVolume"
    import { browser } from "$app/environment"
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
    import {
        computerScreenIndex,
        computerScreenIndexKey,
        dialUpAudioCurrentTime,
        dialUpAudioPaused,
    } from "$stores/states/computer"
    import { firstVisit, firstVisitKey } from "$stores/states/firstVisit"
    import { darkMode, darkModeKey } from "$stores/settings/darkMode"
    import { likesEightBitFont, likesEightBitFontKey } from "$stores/settings/likesEightBitFont"
    import { locale } from "svelte-intl-precompile"
    import { phoneRingtonePaused } from "$stores/states/phone"
    import { scavengerHuntDone, scavengerHuntDoneKey } from "$stores/states/scavengerHuntDone"
    import { t } from "svelte-intl-precompile"

    export let data: DataBasedOnCookies | DataBasedOnDefaults

    // Initialize website state
    $audioVolume = data[audioVolumeKey]
    $computerScreenIndex = data[computerScreenIndexKey]
    $cookiesAllowed = data[cookiesAllowedKey]
    $darkMode = data[darkModeKey]
    $decidedOnCookies = data[decidedOnCookiesKey]
    $firstVisit = data[firstVisitKey]
    $likesEightBitFont = data[likesEightBitFontKey]
    $navigationExplainer = data[navigationExplainerKey]
    $navigationExplainer2 = data[navigationExplainer2Key]
    $navigationState = data[navigationStateKey]
    $scavengerHuntDone = data[scavengerHuntDoneKey]

    let navigationActive: boolean
    let settingsOverlay: HTMLDialogElement

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
    <Notification active={$navigationExplainer} formName={navigationExplainerKey} formValue="false">
        <span class="flex-wrap-center gap" style="--gap-size: 0.3em">
            Pressing <NavigationIcon /> icon opens navigation
        </span>
        <span class="flex-wrap-center gap" style="--gap-size: 0.3em">
            Pressing <SettingsIcon /> icon opens settings
        </span>
        <span class="text-decoration-underline">Press these notifications to close/hide them</span>
    </Notification>
{/if}
{#if !$firstVisit && $navigationExplainer2 && $navigationState === NavigationSchema.enum.navigation}
    <Notification active={$navigationExplainer2} formName={navigationExplainer2Key} formValue="false">
        <span class="flex-wrap-center gap" style="--gap-size: 0.3em">
            Pressing one of the sections navigates to them
        </span>
        <span class="text-decoration-underline">Press these notifications to close/hide them</span>
    </Notification>
{/if}

<NavigationWrapper bind:navigationActive>
    <CoachSection slot="coach" />
    <ComputerSection slot="computer" />
    <ContactSection slot="contact" />
    <PhoneSection slot="phone" />
</NavigationWrapper>

{#if !navigationActive}
    <Button
        id="navigation-button"
        href="/navigation"
        label="Open navigation"
        on:click={() => ($navigationState = NavigationSchema.enum.navigation)}>
        <NavigationIcon slot="icon" />
    </Button>
{/if}
<Button
    id="settings-button"
    href="/settings"
    label="Open settings"
    on:click={(event) => {
        event.preventDefault()
        settingsOverlay.showModal()
    }}>
    <SettingsIcon slot="icon" />
</Button>

<FirstTimeVisitOverlay />
<SettingsOverlay bind:dialog={settingsOverlay} />

<style>
    :global(body > div > a) {
        font-size: var(--static-scale-400) !important;
        position: fixed !important;
        top: 1em;
    }
    :global(body > div > #navigation-button) {
        left: 1em;
    }
    :global(body > div > #settings-button) {
        right: 1em;
    }
    @media (max-width: 666px) {
        :global([data-navigation-state="none"] + #settings-button) {
            left: 50%;
            translate: -50%;
        }
    }
</style>
