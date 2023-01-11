<script lang="ts">
    import { onMount } from "svelte"
    import TEXT_CONVERSATION from "./textConversation"
    import Button from "$components/Button/Button.svelte"
    import TriangleDown from "$assets/icons/TriangleDown.svelte"

    let section: HTMLElement

    let messageIndex = -1
    let buttonActive = false

    function typewriter(node: HTMLElement, { speed = 1.666 }) {
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

<div class="conversation background-blur relative glow border" data-testid="conversation-wrapper">
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
    .conversation {
        --stroke-color: var(--gray-300);
        --background-blur-amount: var(--blur-900);
        --glow-color: var(--gray-300);
        height: 7em;
        overflow: hidden;
        padding: 1em 2em 1em 1em;
        width: 50ch;
    }
    :global([data-dark-mode="false"] .conversation) {
        background-color: var(--white);
    }
    section {
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
    span > p:first-of-type {
        text-transform: uppercase;
    }
    p {
        text-align: left;
    }
    p,
    :global(.conversation button) {
        animation: fadeIn 1337ms;
    }
    :global(.conversation button) {
        bottom: 0;
        position: absolute !important;
        right: 0;
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
