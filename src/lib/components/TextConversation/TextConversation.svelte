<script lang="ts">
    import { onMount } from "svelte"
    import TEXT_CONVERSATION from "./textConversation"

    let messageIndex = -1
    let buttonActive = false

    function typewriter(node: HTMLElement, { speed = 1 }) {
        const text = node ? node.textContent : false
        if (!text) return
        const duration = text.length / (speed * 0.01)
        return {
            duration,
            tick: (t: number) => {
                const i = Math.trunc(text.length * t)
                node.textContent = text.slice(0, i)
            }
        }
    }
    onMount(() => {
        messageIndex = 0
    })
</script>

<div data-testid="conversation-wrapper">
    {#each TEXT_CONVERSATION as { message, person }, index}
        {#if index <= messageIndex}
            <p transition:typewriter on:introend={() => (buttonActive = true)}>
                {person}: {message}
            </p>
        {/if}
    {/each}
    {#if messageIndex + 1 !== TEXT_CONVERSATION.length && buttonActive}
        <button
            on:click={() => {
                if (messageIndex + 1 !== TEXT_CONVERSATION.length) messageIndex += 1
                buttonActive = false
            }}>
            continue
        </button>
    {/if}
</div>
