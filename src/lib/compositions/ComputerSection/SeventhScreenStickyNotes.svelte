<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import LoadingDots from "$components/LoadingDots.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"
    import RickRoll from "$assets/images/RickRoll.svelte"
    import StickyNote from "$components/StickyNote/StickyNote.svelte"

    import { enhance } from "$app/forms"

    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import {
        scavengerHuntState,
        scavengerHuntStateKey,
        S7DefaultState,
        updateScavengerHuntStateKey,
    } from "$stores/states/scavengerHuntState"
    import { setJSCookie } from "$utilities/setJSCookie"
    import { fade } from "svelte/transition"

    let stickyNotesIntro = false
</script>

<div id="sticky-note-wrapper" class="relative">
    {#if stickyNotesIntro}
        <p transition:fade>loading notes<LoadingDots /></p>
    {/if}
    {#each [2, 3, 4, 5, 6, 7, 8, 9, 10] as index}
        <StickyNote stateIndex={index} flyToRight={index % 2 === 0} on:introend={() => (stickyNotesIntro = false)} />
    {/each}
    <StickyNote stateIndex={11} flyToRight={false} on:introend={() => (stickyNotesIntro = false)}>
        <RickRoll />
    </StickyNote>

    {#if !$scavengerHuntState.slice(1).includes("T")}
        {#if $cookiesAllowed}
            <form
                action={`?/${updateScavengerHuntStateKey}`}
                method="POST"
                use:enhance={({ cancel }) => {
                    cancel()
                    stickyNotesIntro = true
                    $scavengerHuntState = S7DefaultState
                    if ($cookiesAllowed) setJSCookie(scavengerHuntStateKey, S7DefaultState)
                }}>
                <Button label="reset notes" name={scavengerHuntStateKey} value={S7DefaultState} />
                <!-- BUG: just reseting to default S7 state will hide the HideableNotification if its open -->
            </form>
        {:else}
            <form
                on:submit={() => {
                    $scavengerHuntState = S7DefaultState
                    stickyNotesIntro = true
                }}>
                <HiddenInputs excludeStates={[scavengerHuntStateKey]} />
                <Button label="reset notes" name={scavengerHuntStateKey} value={S7DefaultState} />
                <!-- BUG: just reseting to default S7 state will hide the HideableNotification if its open -->
            </form>
        {/if}
    {/if}
</div>

<style>
    #sticky-note-wrapper {
        top: 50%;
        left: 50%;
        translate: -50%;
        max-width: 200px;
        width: 100%;
        aspect-ratio: 1/1;
        z-index: 1337;
    }
    @media (max-height: 400px) {
        #sticky-note-wrapper {
            top: 60%;
        }
    }
</style>
