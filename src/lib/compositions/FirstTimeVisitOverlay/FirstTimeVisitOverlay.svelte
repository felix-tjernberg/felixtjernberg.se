<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import { onMount } from "svelte"
    import { browser } from "$app/environment"

    import { activeSection, SectionsSchema } from "$stores/states/activeSection"
    import { audioVolume } from "$stores/settings/audioVolume"
    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { darkMode } from "$stores/settings/darkMode"
    import { firstVisit, firstVisitNotification } from "$stores/states/firstVisit"
    import { likesEightBitFont } from "$stores/settings/likesEightBitFont"

    import BooleanButton from "$components/BooleanButton/BooleanButton.svelte"
    import Button from "$components/Button/Button.svelte"
    import DetailsContent from "./DetailsContent.svelte"
    import Moon from "$assets/svgs/Moon.svelte"
    import Slider from "$components/Slider/Slider.svelte"
    import Sun from "$assets/svgs/Sun.svelte"

    const dispatch = createEventDispatcher()

    let dialog: HTMLDialogElement
    let details: HTMLDetailsElement

    let decidingAboutCookies: boolean = true
    let detailsOpen: boolean = false
</script>

<dialog open={$firstVisit} id="first-time-visit-dialog" class="relative background-blur">
    <h2 class="visually-hidden">First Time Visit Dialog</h2>
    <div id="first-time-visit-box" class="background-blur margin-vertical-flow margin glow">
        {#if decidingAboutCookies}
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
                <Button
                    label="Decline cookies"
                    on:click={() => {
                        dispatch("startElevatorMusic")
                        decidingAboutCookies = false
                        $firstVisitNotification = true
                        $cookiesAllowed = false
                    }} />
                <Button
                    label="Allow essential cookies"
                    on:click={async () => {
                        decidingAboutCookies = false
                        $firstVisitNotification = true
                        dispatch("startElevatorMusic")
                        if (browser) {
                            $cookiesAllowed = true
                        }
                    }} />
            </div>
        {:else}
            <p class="font-family-primary-fat text-align-center">
                Before you explore my page here I would like you to set some preferences
            </p>
            <Slider
                description="Set the elevator music volume to a comfortable level please :)"
                label="Elevator music volume"
                bind:value={$audioVolume} />
            <BooleanButton
                description="Do you like reading the 8bit font?"
                labels={["yes", "no"]}
                bind:boolean={$likesEightBitFont} />
            <BooleanButton
                description="If you need higher contrast or like light theme click the sun"
                labels={["dark", "light"]}
                testid="dark-mode"
                bind:boolean={$darkMode}>
                <Moon slot="firstIcon" />
                <Sun slot="secondIcon" />
            </BooleanButton>
            <Button
                id="close-first-time-visit-dialog"
                label="I'm ready to explore!"
                testid="close-first-time-visit-dialog"
                on:click={() => {
                    dialog.close()
                    dispatch("stopElevatorMusic")
                }} />
        {/if}
    </div>
</dialog>

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
        height: auto;
        max-height: 100%;
        max-width: 100%;
        overflow: hidden;
        place-content: center;
        width: auto;
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
    :global(#first-time-visit-box .slider) {
        --margin-vertical-flow-amount: var(--relative-scale-000) !important;
    }
    :global(#close-first-time-visit-dialog) {
        --margin-vertical-flow-amount: var(--static-scale-300);
        margin-left: auto;
        margin-right: auto;
    }
</style>
