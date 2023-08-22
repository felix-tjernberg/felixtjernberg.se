<script lang="ts">
    import PhoneImage from "./PhoneImage.svelte"
    import TriangleDown from "$assets/svgs/TriangleDown.svelte"

    import HideableNotification from "$components/Notification/HideableNotification.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"
    import PhoneCanvas from "./PhoneCanvas.svelte"
    import TextConversation from "$components/TextConversation/TextConversation.svelte"

    import { enhance } from "$app/forms"
    import { fade } from "svelte/transition"

    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import {
        F,
        S6AnswerMomState,
        T,
        scavengerHuntState,
        scavengerHuntStateKey,
        updateScavengerHuntStateKey,
    } from "$stores/states/scavengerHuntState"
    import { phoneRingtonePaused } from "$stores/states/phoneRingtonePaused"
    import { setJSCookie } from "$utilities/setJSCookie"

    $: screenState = $scavengerHuntState[0]
    $: momCalling = $scavengerHuntState[2] === F
    $: conversationDone = $scavengerHuntState[3] === "9"
</script>

<section id="phone-section" class="flex-column align-items-center height-100percent">
    <div class="flex-column align-items-center gap margin-vertical-auto before-and-after-spacing">
        {#if screenState === "6" && !conversationDone}
            <p
                class="background-blur border glow font-family-primary-fat"
                data-testid="answer-instruction"
                id="answer-instruction"
                transition:fade>
                {#if momCalling}
                    Press <br />
                    "C"<br />
                    button<br />
                    to answer
                {:else}
                    Press <br />
                    "<span class="visually-hidden">▼</span><TriangleDown />"<br />
                    button to show next message
                {/if}
            </p>
        {/if}
        {#if (screenState === "6" && !momCalling) || screenState === "7"}
            <TextConversation />
        {/if}
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <h2 class="section-header" tabindex="0">Phone</h2>
        <div id="phone" class="relative">
            <PhoneCanvas />
            <PhoneImage />
            {#if momCalling}
                {#if $cookiesAllowed}
                    <form
                        class="absolute"
                        action={`?/${updateScavengerHuntStateKey}`}
                        method="POST"
                        use:enhance={({ cancel }) => {
                            cancel()
                            $phoneRingtonePaused = true
                            $scavengerHuntState = S6AnswerMomState
                            if ($cookiesAllowed) setJSCookie(scavengerHuntStateKey, S6AnswerMomState)
                        }}>
                        <button class="glow opacity-flashing">
                            <span class="visually-hidden">answer call</span>
                        </button>
                    </form>
                {:else}
                    <form
                        class="absolute"
                        on:submit={() => {
                            $phoneRingtonePaused = true
                            $scavengerHuntState = S6AnswerMomState
                        }}>
                        <HiddenInputs excludeStates={[scavengerHuntStateKey]} />
                        <button class="glow opacity-flashing" name={scavengerHuntStateKey} value={S6AnswerMomState}>
                            <span class="visually-hidden">answer call</span>
                        </button>
                    </form>
                {/if}
            {/if}
        </div>
    </div>
    {#if $scavengerHuntState[0] === "6" && $scavengerHuntState[3] > "3"}
        <HideableNotification stateIndex={4} state={T}>
            <p>Did mom just mention anakinra?</p>
        </HideableNotification>
    {/if}
</section>

<style>
    #phone > :global(picture) {
        width: 200px;
    }
    form {
        top: 240px;
        left: 28px;
    }
    button {
        --glow-color: var(--glow-pink);
        opacity: 0.5;
    }
    button:hover {
        --glow-size: 10px;
    }
    button:active {
        opacity: 1 !important;
    }
    #answer-instruction {
        --background-blur-amount: 5px;
        --glow-color: var(--gray-100);
        --glow-size: 13.37px;
        --stroke-color: var(--gray-100);
        --stroke-width: var(--stroke-400);
        padding: 0.5em 1em;
        max-width: 400px;
        text-transform: capitalize;
    }
    #phone-section {
        overflow-y: auto;
    }
    .before-and-after-spacing::before,
    .before-and-after-spacing::after {
        content: "";
        height: calc(var(--static-scale-300) * 2);
    }
</style>
