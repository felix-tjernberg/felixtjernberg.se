<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import FirstTimeVisitOverlay from "$compositions/FirstTimeVisitOverlay/FirstTimeVisitOverlay.svelte"
    import NavigationIcon from "$assets/svgs/NavigationIcon.svelte"
    import SettingsIcon from "$assets/svgs/SettingsIcon.svelte"
    import SettingsOverlay from "$compositions/SettingsOverlay/SettingsOverlay.svelte"
    import NavigationWrapper from "$compositions/NavigationWrapper/NavigationWrapper.svelte"
    import CoachSection from "$compositions/CoachSection/CoachSection.svelte"
    import ComputerSection from "$compositions/ComputerSection/ComputerSection.svelte"
    import ContactSection from "$compositions/ContactSection/ContactSection.svelte"
    import PhoneSection from "$compositions/PhoneSection/PhoneSection.svelte"
    import WelcomeSection from "$compositions/WelcomeSection/WelcomeSection.svelte"

    import { activeSection, activeSectionKey, SectionsSchema } from "$stores/states/activeSection"
    import { audioVolume, audioVolumeKey } from "$stores/settings/audioVolume"
    import { browser } from "$app/environment"
    import { cookiesAllowed, cookiesAllowedKey } from "$stores/settings/cookiesAllowed"
    import type { DataBasedOnCookies, DataBasedOnDefaults } from "./+page.server"
    import {
        computerScreenIndex,
        computerScreenIndexKey,
        dialUpAudioCurrentTime,
        dialUpAudioPaused,
    } from "$stores/states/computer"
    import {
        firstVisit,
        firstVisitKey,
        firstVisitNotification,
        firstVisitNotificationKey,
    } from "$stores/states/firstVisit"
    import { darkMode, darkModeKey } from "$stores/settings/darkMode"
    import { likesEightBitFont, likesEightBitFontKey } from "$stores/settings/likesEightBitFont"
    import { locale } from "svelte-intl-precompile"
    import { phoneRingtonePaused } from "$stores/states/phone"
    import { scavengerHuntDone, scavengerHuntDoneKey } from "$stores/states/scavengerHuntDone"
    import { t } from "svelte-intl-precompile"

    export let data: DataBasedOnCookies | DataBasedOnDefaults

    // Initialize website state
    $activeSection = data[activeSectionKey]
    $audioVolume = data[audioVolumeKey]
    $computerScreenIndex = data[computerScreenIndexKey]
    $cookiesAllowed = data[cookiesAllowedKey]
    $darkMode = data[darkModeKey]
    $firstVisit = data[firstVisitKey]
    $firstVisitNotification = data[firstVisitNotificationKey]
    $likesEightBitFont = data[likesEightBitFontKey]
    $scavengerHuntDone = data[scavengerHuntDoneKey]

    let settingsOverlay: HTMLDialogElement

    let elevatorMusicAudioElement: HTMLAudioElement
    let elevatorMusicPaused: boolean = true

    let navigationActive: boolean

    $: if (elevatorMusicAudioElement) elevatorMusicAudioElement.volume = $audioVolume

    $: if (browser) document.documentElement.lang = $locale

    $: if (browser) window.document.body.dataset.darkMode = String($darkMode)
    $: if (browser) window.document.body.dataset.eightBitFont = String($likesEightBitFont)
</script>

<svelte:head>
    <title>Felix Tjernberg</title>
    <meta name="description" content={$t("description")} />
</svelte:head>

<audio
    bind:this={elevatorMusicAudioElement}
    bind:paused={elevatorMusicPaused}
    src="https://incompetech.com/music/royalty-free/mp3-royaltyfree/Local%20Forecast.mp3" />
<audio
    bind:volume={$audioVolume}
    bind:paused={$phoneRingtonePaused}
    src="https://cdn.pixabay.com/download/audio/2021/08/09/audio_a4637e27f0.mp3?filename=smartphone_vibrating_alarm_silent-7040.mp3" />
<audio
    bind:volume={$audioVolume}
    bind:paused={$dialUpAudioPaused}
    bind:currentTime={$dialUpAudioCurrentTime}
    src="https://www.soundjay.com/communication/sounds/dial-up-modem-01.mp3" />

<NavigationWrapper bind:navigationActive>
    <CoachSection slot="coach" />
    <ComputerSection slot="computer" />
    <ContactSection slot="contact" />
    <PhoneSection slot="phone" />
    <WelcomeSection slot="welcome" />
</NavigationWrapper>

{#if !navigationActive}
    <Button
        flashing={$firstVisit}
        id="navigation-button"
        href="/navigation"
        label="Open navigation"
        on:click={(event) => {
            if ($firstVisit) $firstVisit = false
            event.preventDefault()
            $activeSection = SectionsSchema.enum.none
        }}>
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

<FirstTimeVisitOverlay
    on:startElevatorMusic={() => (elevatorMusicPaused = false)}
    on:stopElevatorMusic={() => (elevatorMusicPaused = true)} />
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
        :global([data-active-section="none"] + #settings-button) {
            left: 50%;
            translate: -50%;
        }
    }
</style>
