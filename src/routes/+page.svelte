<script lang="ts">
    import "$lib/stylesheets/stylesheets.css"
    import { activeSection } from "$stores/activeSectionStore"
    import { audioVolume } from "$stores/audioVolumeStore"
    import { browser } from "$app/environment"
    import { darkMode } from "$stores/darkModeStore"
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
    import Notification from "$components/Notification/Notification.svelte"
    import NavigationWrapper from "$compositions/NavigationWrapper/NavigationWrapper.svelte"
    import CoachSection from "$compositions/CoachSection/CoachSection.svelte"
    import ComputerSection from "$compositions/ComputerSection/ComputerSection.svelte"
    import ContactSection from "$compositions/ContactSection/ContactSection.svelte"
    import PhoneSection from "$compositions/PhoneSection/PhoneSection.svelte"
    import WelcomeSection from "$compositions/WelcomeSection/WelcomeSection.svelte"

    let settingsOverlay: HTMLDialogElement
    let firstTimeVisitNotification: boolean

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

<StarfieldBackground />
{#if firstTimeVisitNotification}
    <Notification active={firstTimeVisitNotification}>
        <p class="font-size-200">
            If you change your mind about any settings click the cogwheel icon in the top right of the screen
        </p>
        <p class="font-size-100">(Click this notification to close it)</p>
    </Notification>
{/if}

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
    on:stopElevatorMusic={() => {
        firstTimeVisitNotification = true
        elevatorMusicPaused = true
    }} />
<SettingsOverlay bind:dialog={settingsOverlay} />

<style>
    :global(body > div > a) {
        font-size: var(--static-scale-400) !important;
        position: absolute !important;
        top: 1em;
    }
    :global(body > div > #navigation-button) {
        left: 1em;
    }
    :global(body > div > #settings-button) {
        right: 1em;
    }
</style>
