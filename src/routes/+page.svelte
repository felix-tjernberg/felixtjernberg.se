<script lang="ts">
    import "$lib/stylesheets/stylesheets.css"
    import { activeSection } from "$stores/activeSectionStore"
    import { audioVolume } from "$stores/audioVolumeStore"
    import { browser } from "$app/environment"
    import { darkMode } from "$stores/darkModeStore"
    import { dialUpAudioCurrentTime, dialUpAudioPaused, phoneRingtonePaused } from "$stores/computerSectionStores"
    import { likesEightBitFont } from "$stores/likesEightBitFontStore"
    import { locale } from "svelte-intl-precompile"
    import { t } from "svelte-intl-precompile"
    import { SectionsSchema } from "$compositions/NavigationWrapper/NavigationSectionsSchema"

    import Button from "$components/Button/Button.svelte"
    import FirstTimeVisitOverlay from "$compositions/FirstTimeVisitOverlay/FirstTimeVisitOverlay.svelte"
    import NavigationIcon from "$assets/svgs/NavigationIcon.svelte"
    import SettingsIcon from "$assets/svgs/SettingsIcon.svelte"
    import SettingsOverlay from "$compositions/SettingsOverlay/SettingsOverlay.svelte"
    import StarfieldBackground from "$components/StarfieldBackground.svelte"
    import NavigationWrapper from "$compositions/NavigationWrapper/NavigationWrapper.svelte"
    import CoachSection from "$compositions/CoachSection/CoachSection.svelte"
    import ComputerSection from "$compositions/ComputerSection/ComputerSection.svelte"
    import ContactSection from "$compositions/ContactSection/ContactSection.svelte"
    import PhoneSection from "$compositions/PhoneSection/PhoneSection.svelte"
    import WelcomeSection from "$compositions/WelcomeSection/WelcomeSection.svelte"
    import { onMount } from "svelte"

    let settingsOverlay: HTMLDialogElement

    let elevatorMusicAudioElement: HTMLAudioElement
    let elevatorMusicPaused: boolean = true

    let navigationActive: boolean

    $: if (elevatorMusicAudioElement) elevatorMusicAudioElement.volume = $audioVolume

    $: if (browser) document.documentElement.lang = $locale

    $: if (browser) window.document.body.dataset.darkMode = $darkMode
    $: if (browser) window.document.body.dataset.eightBitFont = $likesEightBitFont

    // if (browser) window.localStorage.clear()
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

<StarfieldBackground />

<NavigationWrapper bind:navigationActive>
    <CoachSection slot="coach" />
    <ComputerSection slot="computer" />
    <ContactSection slot="contact" />
    <PhoneSection slot="phone" />
    <WelcomeSection slot="welcome" />
</NavigationWrapper>

{#if !navigationActive}
    <Button
        id="navigation-button"
        href="/navigation"
        label="Open navigation"
        on:click={(event) => {
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
