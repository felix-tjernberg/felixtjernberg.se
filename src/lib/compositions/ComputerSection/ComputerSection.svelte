<script lang="ts">
    import Computer from "./Computer.svelte"
    import HideableNotification from "$components/Notification/HideableNotification.svelte"

    import FirstScreen from "./FirstScreen.svelte"
    import FirstScreenStickyNotes from "./FirstScreenStickyNotes.svelte"
    import SecondScreen from "./SecondScreen.svelte"
    import ThirdScreen from "./ThirdScreen.svelte"
    import FourthScreen from "./FourthScreen.svelte"
    import FourthScreenHints from "./FourthScreenHints.svelte"
    import FifthScreen from "./FifthScreen.svelte"
    import SixthScreen from "./SixthScreen.svelte"
    import SeventhScreen from "./SeventhScreen.svelte"
    import SeventhScreenStickyNotes from "./SeventhScreenStickyNotes.svelte"

    import { browser } from "$app/environment"
    import { D, scavengerHuntState } from "$stores/states/scavengerHuntState"

    $: screenState = $scavengerHuntState[0]
</script>

<section id="computer-section" class="height-100percent grid-stack">
    <h2 class="visually-hidden absolute">computer</h2>
    {#if screenState === "1"}
        {#if $scavengerHuntState[4] !== D}
            <HideableNotification stateIndex={4} state={$scavengerHuntState[4]}>
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
    {#if screenState === "2"}
        <HideableNotification stateIndex={1} state={$scavengerHuntState[1]}>
            {#if browser}
                <p>
                    Next screen will appear when the dial up audio has completed <br /><br />
                    If it did not start automatically <br /><br />
                    Press "show dial up audio player" and play the audio until completion
                </p>
            {:else}
                <p>
                    Because you do not have JavaScript active you have to <br /><br />
                    manually click the <br />
                    "show dial up audio player" <br /><br />
                    and then click the <br />
                    "Go To Next Screen Button" <br /><br />
                    However i recommend you to play the dial up audio for awesome nostalgic feels
                </p>
            {/if}
        </HideableNotification>
        <Computer>
            <SecondScreen slot="screen" />
        </Computer>
    {/if}
    {#if screenState === "3"}
        <Computer>
            <ThirdScreen slot="screen" />
        </Computer>
    {/if}
    {#if screenState === "4"}
        <FourthScreenHints />
        <Computer>
            <FourthScreen slot="screen" />
        </Computer>
    {/if}
    {#if screenState === "5"}
        <HideableNotification stateIndex={1} state={$scavengerHuntState[1]}>
            <p>you will find the answer in the coach section</p>
        </HideableNotification>
        <Computer>
            <FifthScreen slot="screen" />
        </Computer>
    {/if}
    {#if screenState === "6"}
        <Computer>
            <SixthScreen slot="screen" />
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
