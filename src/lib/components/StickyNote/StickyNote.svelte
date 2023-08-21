<script lang="ts">
    import HiddenInputs from "$components/HiddenInputs.svelte"
    import StickyNoteButton from "./StickyNoteButton.svelte"
    import StickyNoteImages from "./StickyNoteImages.svelte"

    import { backIn, elasticIn } from "svelte/easing"
    import { enhance } from "$app/forms"

    import {
        type ScavengerHuntStates,
        scavengerHuntState,
        scavengerHuntStateKey,
        F,
        T,
        updateScavengerHuntStateKey,
    } from "$stores/states/scavengerHuntState"
    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { setJSCookie } from "$utilities/setJSCookie"

    const RANDOM_SEED = Math.random()
    const TAPE_ROTATION_AMOUNT = RANDOM_SEED > 0.5 ? RANDOM_SEED * -4.2 : RANDOM_SEED * 4.2

    export let stateIndex: number
    export let overrideNewScavengerHuntState: ScavengerHuntStates | false = false
    export let flyToRight: boolean = true

    let active: boolean

    function flyAway(_: HTMLElement, { duration, flyToRight }: { duration: number; flyToRight: boolean }) {
        const targetXSeed = RANDOM_SEED * 50
        return {
            duration,
            css: (t: number) => {
                const easedTimeStepIn = backIn(t)
                const y = (1 - t) * 110
                const x = (1 - elasticIn(t)) * targetXSeed
                return `
					transform:  rotate(${easedTimeStepIn * 1080}deg);
                    translate: ${flyToRight ? "" : "-"}${x}vw ${y}vh;
                    `
            },
        }
    }

    let newScavengerHuntState: ScavengerHuntStates

    $: active = $scavengerHuntState[stateIndex] === T
    $: {
        overrideNewScavengerHuntState
            ? (newScavengerHuntState = overrideNewScavengerHuntState)
            : (newScavengerHuntState = ($scavengerHuntState.slice(0, stateIndex) +
                  F +
                  $scavengerHuntState.slice(stateIndex + 1)) as ScavengerHuntStates)
    }
</script>

{#if active}
    <div
        class="sticky-note absolute flex-column-center"
        style={`--rotation-amount: ${TAPE_ROTATION_AMOUNT}deg`}
        transition:flyAway={{ duration: 5000, flyToRight }}>
        <StickyNoteImages />
        <slot />
        {#if active}
            {#if $cookiesAllowed}
                <form
                    action={`?/${updateScavengerHuntStateKey}`}
                    method="POST"
                    use:enhance={({ cancel }) => {
                        cancel()
                        $scavengerHuntState = newScavengerHuntState
                        if ($cookiesAllowed) setJSCookie(scavengerHuntStateKey, newScavengerHuntState)
                        active = false
                    }}>
                    <StickyNoteButton {newScavengerHuntState} />
                </form>
            {:else}
                <form
                    on:submit={() => {
                        $scavengerHuntState = newScavengerHuntState
                        active = false
                    }}>
                    <HiddenInputs excludeStates={[scavengerHuntStateKey]} />
                    <StickyNoteButton {newScavengerHuntState} />
                </form>
            {/if}
        {/if}
    </div>
{/if}

<style>
    .sticky-note {
        aspect-ratio: 1/1;
        padding: 1em;
        place-content: center;
        inset: 0;
        font-size: var(--static-scale-100);
    }
    .sticky-note :global(picture) {
        position: absolute;
    }
    .sticky-note :global(> *:not(picture)) {
        z-index: 1337;
    }
    .sticky-note :global(button),
    .sticky-note :global(img) {
        height: 100%;
        border-radius: 3px;
    }
    .sticky-note :global(p),
    .sticky-note :global(button) {
        color: var(--black);
    }
    .sticky-note :global(button),
    .sticky-note :global(p) {
        font-family: var(--font-family-accent) !important;
    }
    .sticky-note form,
    .sticky-note :global(button) {
        position: absolute;
        height: 100%;
        width: 100%;
    }
    .sticky-note :global(button) {
        color: var(--white);
        border: none !important;
        background-color: var(--black-90-percent);
        opacity: 0;
        text-decoration: underline;
        transition: opacity 420ms ease-in-out;
        max-width: 100%;
    }
    .sticky-note:hover :global(button),
    .sticky-note :global(button:focus) {
        opacity: 1;
    }
    :global([data-dark-mode="false"] .sticky-note button) {
        color: var(--black);
    }
</style>
