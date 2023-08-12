<script lang="ts">
    import FirstScreen from "./FirstScreen.svelte"
    import FirstScreenStickyNotes from "./FirstScreenStickyNotes.svelte"
    import SecondScreen from "./SecondScreen.svelte"
    import ThirdScreen from "./ThirdScreen.svelte"
    import FourthScreen from "./FourthScreen.svelte"
    import FifthScreen from "./FifthScreen.svelte"
    import Notification from "$components/Notification/Notification.svelte"
    import SixthScreen from "./SixthScreen.svelte"
    import SeventhScreen from "./SeventhScreen.svelte"
    import SeventhScreenStickyNotes from "./SeventhScreenStickyNotes.svelte"
    import CrtOverlay from "./CRTOverlay.svelte"

    import { computerScreenIndex } from "$stores/states/computer"

    const SCREENS = [FirstScreen, SecondScreen, ThirdScreen, FourthScreen, FifthScreen, SixthScreen, SeventhScreen]

    let clueNotificationActive: boolean
</script>

<section id="computer-section" class="height-100percent grid-stack">
    <h2 class="visually-hidden absolute">computer</h2>
    <!-- {#if $computerScreenIndex == 0}
        <Notification>
            <p>
                PIN CODE:<br />
                Is the sum of the 4 numbers in the corners
            </p>
        </Notification>
    {/if} -->
    <!-- {#if $computerScreenIndex == 5}
        <Notification>
            {#if !$answeredCall}
                <p>
                    Mom is calling
                    <a
                        tabindex="-1"
                        href="/phone"
                        on:click|preventDefault={() => ($navigationState = NavigationSchema.enum.phone)}>
                        go answer the phone!
                    </a>
                </p>
            {:else}
                <p>Did mom mention anything about her dosage?</p>
            {/if}
        </Notification>
    {/if} -->
    <!-- {#if $computerScreenIndex == 6}
        <Notification active={true} testid="hunt-done-notification">
            <p>Scavenger hunt is now done and can be reset in the settings menu</p>
        </Notification>
    {/if} -->
    <div id="computer" class="relative margin-auto grid-stack">
        {#if $computerScreenIndex == 0}
            <FirstScreenStickyNotes bind:clueNotificationActive />
        {/if}
        <CrtOverlay>
            <svelte:component this={SCREENS[$computerScreenIndex]} />
        </CrtOverlay>
        <!--{#if $computerScreenIndex == 6}
            <SeventhScreenStickyNotes />
        {/if} -->
    </div>
</section>

<style>
    #computer {
        height: min(100%, 500px);
        width: min(100%, 500px);
    }
</style>
