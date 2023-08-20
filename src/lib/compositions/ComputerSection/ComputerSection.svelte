<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import Computer from "./Computer.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"
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
    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { D, scavengerHuntState } from "$stores/states/scavengerHuntState"
    import { NavigationSchema, navigationState, navigationStateKey } from "$stores/states/navigation"

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
        {#if $scavengerHuntState[1] !== D}
            <HideableNotification stateIndex={1} state={$scavengerHuntState[1]}>
                <p>mom is calling</p>
                {#if $cookiesAllowed}
                    <Button
                        href="/phone"
                        label="Go answer the phone"
                        underlined={true}
                        on:click={() => ($navigationState = NavigationSchema.enum.phone)} />
                {:else}
                    <form on:submit={() => ($navigationState = NavigationSchema.enum.phone)}>
                        <HiddenInputs excludeStates={[navigationStateKey]} />
                        <Button
                            underlined={true}
                            label="Go answer the phone"
                            name={navigationStateKey}
                            value={NavigationSchema.enum.phone} />
                    </form>
                {/if}
            </HideableNotification>
        {/if}
        <Computer>
            <SixthScreen slot="screen" />
        </Computer>
    {/if}
    {#if screenState === "7"}
        <HideableNotification state={$scavengerHuntState[1]} stateIndex={1}>
            <p>Scavenger hunt is now done, <br />and can be reset in the settings menu</p>
        </HideableNotification>
        <Computer>
            <SeventhScreenStickyNotes slot="stickyNotes" />
            <SeventhScreen slot="screen" />
        </Computer>
    {/if}
</section>
