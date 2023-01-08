<script lang="ts">
    import { onMount } from "svelte"
    import TEXT_CONVERSATION from "./textConversation"
    import Button from "$components/Button/Button.svelte"
    import TriangleDown from "$assets/icons/TriangleDown.svelte"

    let section: HTMLElement

    let messageIndex = -1
    let buttonActive = false

    function typewriter(node: HTMLElement, { speed = 1337 }) {
        const text = node ? node.textContent : false
        if (!text) return
        const duration = text.length / (speed * 0.01)
        return {
            duration,
            tick: (t: number) => {
                const i = Math.trunc(text.length * t)
                node.textContent = text.slice(0, i)
                section.scrollTop = section.scrollHeight
            }
        }
    }
    onMount(() => {
        messageIndex = 0
    })
</script>

<div class="conversation background-blur-900 relative glow" data-testid="conversation-wrapper">
    <section bind:this={section} class="flex-column">
        {#each TEXT_CONVERSATION as { message, person }, index}
            {#if index <= messageIndex}
                <span
                    class="flex glow"
                    style={`${person === "mom" ? "--glow-color:var(--glow-pink)" : "--glow-color:var(--glow-green)"}`}>
                    {#if person}
                        <p>{person}:</p>
                    {/if}
                    <p class="flex" transition:typewriter on:introend={() => (buttonActive = true)}>
                        {message}
                    </p>
                </span>
            {/if}
        {/each}
    </section>
    {#if messageIndex + 1 !== TEXT_CONVERSATION.length && buttonActive}
        <Button
            label="See next message"
            on:click={() => {
                messageIndex += 1
                buttonActive = false
            }}>
            <TriangleDown slot="icon" />
        </Button>
    {/if}
</div>

<style>
    span {
        gap: 1ch;
    }
    span p:first-of-type {
        text-transform: capitalize;
    }
    section {
        scrollbar-width: none;
        overflow-y: scroll;
        padding-left: 2ch;
        padding-right: 1ch;
        -ms-overflow-style: none;
        height: 100%;
    }
    section::-webkit-scrollbar {
        display: none;
    }
    div {
        width: 50ch;
        border: var(--stroke-200) solid var(--gray-900);
        padding: 1em 2em 1em 1em;
        height: 7em;
        overflow: hidden;
    }
    p {
        text-align: left;
        animation: fadeIn 1337ms;
    }
    p::fist-letter {
        animation: fadeIn 1337ms;
    }
    :global([data-dark-mode="false"] .conversation p) {
        color: var(--gray-900);
    }
    :global([data-dark-mode="false"] .conversation) {
        border: none !important;
    }
    :global(.conversation button) {
        position: absolute !important;
        bottom: 0;
        right: 0;
        animation: fadeIn 1337ms;
    }
    :global(.conversation button svg) {
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
