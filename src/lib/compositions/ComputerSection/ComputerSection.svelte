<script lang="ts">
    import Computer from "./Computer.svelte"
    import HideableNotification from "$components/Notification/HideableNotification.svelte"

    import FirstScreen from "./FirstScreen.svelte"
    import FirstScreenStickyNotes from "./FirstScreenStickyNotes.svelte"
    import SecondScreen from "./SecondScreen.svelte"
    import ThirdScreen from "./ThirdScreen.svelte"
    import FourthScreen from "./FourthScreen.svelte"
    import FifthScreen from "./FifthScreen.svelte"
    import SixthScreen from "./SixthScreen.svelte"
    import SeventhScreen from "./SeventhScreen.svelte"
    import SeventhScreenStickyNotes from "./SeventhScreenStickyNotes.svelte"

    import { deactivatedStateSchema, scavengerHuntState } from "$stores/states/scavengerHuntState"

    $: screenState = $scavengerHuntState[1]
</script>

<section id="computer-section" class="height-100percent grid-stack">
    <h2 class="visually-hidden absolute">computer</h2>
    {#if screenState === "1"}
        {#if $scavengerHuntState[5] !== deactivatedStateSchema.value}
            <HideableNotification stateIndex={5} state={$scavengerHuntState[5]}>
                <p>
                    PIN CODE:<br />
                    Is the sum of the 4 numbers in the corners
                </p>
            </HideableNotification>
        {/if}
        <Computer>
            <FirstScreenStickyNotes slot="stickyNotes" />
            <FirstScreen slot="screen" />
        </Computer>
    {/if}
</section>

<!-- TODO {#if $computerScreenIndex == 5}
        <CloseableNotification>
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
        </CloseableNotification>
    {/if} -->
<!-- TODO {#if $computerScreenIndex == 6}
        <CloseableNotification active={true} testid="hunt-done-notification">
            <p>Scavenger hunt is now done and can be reset in the settings menu</p>
        </CloseableNotification>
    {/if} -->

<!-- TODO {#if $computerScreenIndex == 6}
            <SeventhScreenStickyNotes />
        {/if} -->
