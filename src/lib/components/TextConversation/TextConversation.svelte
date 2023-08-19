<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import TriangleDown from "$assets/svgs/TriangleDown.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"

    import { enhance } from "$app/forms"

    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { setJSCookie } from "$utilities/setJSCookie"
    import {
        scavengerHuntState,
        type ScavengerHuntStates,
        scavengerHuntStateKey,
    } from "$stores/states/scavengerHuntState"
    import TEXT_CONVERSATION from "./textConversation"
    import typewriter from "$utilities/transitions/typewriter"

    let section: HTMLElement

    let buttonActive = true

    $: firstMessage = $scavengerHuntState[3] === "0"
    $: conversationDone = $scavengerHuntState[3] === "9" || $scavengerHuntState[0] === "7"
    $: messageIndex = $scavengerHuntState[0] === "6" ? $scavengerHuntState[3] : "9"

    $: newScavengerHuntState = ($scavengerHuntState.slice(0, 3) +
        String(Number($scavengerHuntState[3]) + 1)) as ScavengerHuntStates
</script>

<div id="conversation" class="background-blur relative glow border" data-testid="conversation-wrapper">
    <section bind:this={section} class="flex-column margin-vertical-flow">
        {#each TEXT_CONVERSATION as { message, person }, index}
            {#if index <= Number(messageIndex)}
                <span
                    class="flex glow"
                    style={`${person === "mom" ? "--glow-color:var(--glow-pink)" : "--glow-color:var(--glow-green)"}`}>
                    {#if person}
                        <p>{person}:</p>
                    {/if}
                    <p
                        class="flex"
                        transition:typewriter={{ containerElement: section }}
                        on:introstart={() => (buttonActive = false)}
                        on:introend={() => (buttonActive = true)}>
                        {message}
                    </p>
                </span>
            {/if}
        {/each}
    </section>
    {#if !conversationDone && buttonActive}
        {#if $cookiesAllowed}
            <form
                class="font-size-300"
                action="?/updateScavengerHuntState"
                method="POST"
                use:enhance={({ cancel }) => {
                    cancel()
                    $scavengerHuntState = newScavengerHuntState
                    if ($cookiesAllowed) setJSCookie(scavengerHuntStateKey, newScavengerHuntState)
                }}>
                <Button
                    flashing={firstMessage}
                    label="See next message"
                    name={scavengerHuntStateKey}
                    value={newScavengerHuntState}>
                    <TriangleDown slot="icon" />
                </Button>
            </form>
        {:else}
            <form class="font-size-300" on:submit={() => ($scavengerHuntState = newScavengerHuntState)}>
                <HiddenInputs excludeStates={[scavengerHuntStateKey]} />
                <Button
                    flashing={firstMessage}
                    label="See next message"
                    name={scavengerHuntStateKey}
                    value={newScavengerHuntState}>
                    <TriangleDown slot="icon" />
                </Button>
            </form>
        {/if}
    {/if}
</div>

<style>
    #conversation {
        --stroke-color: var(--gray-300);
        --background-blur-amount: var(--blur-900);
        --glow-color: var(--gray-300);
        height: 7em;
        padding: 1em 2em 1em 1em;
        width: 100%;
        max-width: 50ch;
    }
    #conversation form {
        bottom: 0;
        position: absolute !important;
        right: 0;
    }
    :global([data-dark-mode="false"] #conversation) {
        background-color: var(--white);
    }
    section {
        --margin-vertical-flow-amount: 0.5em;
        -ms-overflow-style: none;
        height: 100%;
        overflow-y: auto;
        padding-left: 2ch;
        padding-right: 1ch;
        scrollbar-width: none;
    }
    section::-webkit-scrollbar {
        display: none;
    }
    span {
        gap: 1ch;
    }
    :global([data-dark-mode="false"] #conversation span) {
        filter: none;
    }
    span > p:first-of-type:not(:last-of-type) {
        text-transform: uppercase;
    }
    p {
        text-align: left;
        text-wrap: wrap;
    }
    p,
    :global(#conversation button) {
        animation: fadeIn 1337ms;
    }
    :global(#conversation button svg) {
        animation: bob 1337ms infinite;
    }
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes bob {
        0% {
            translate: 0 0;
        }
        50% {
            translate: 0 10%;
        }
        100% {
            translate: 0 0;
        }
    }
</style>
