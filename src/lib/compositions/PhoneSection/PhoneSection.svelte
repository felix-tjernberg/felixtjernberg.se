<script lang="ts">
    import { fade } from "svelte/transition"
    import { answeredCall, conversationDone, momCalling } from "$stores/phoneSectionStores"
    import phone from "$assets/images/phone.png"
    import PhoneCanvas from "./PhoneCanvas.svelte"
    import TextConversation from "$components/TextConversation/TextConversation.svelte"
    import TriangleDown from "$assets/svgs/TriangleDown.svelte"
    import { phoneRingtonePaused } from "$stores/computerSectionStores"
</script>

<section id="phone-section" class="gap">
    {#if !JSON.parse($conversationDone) && (JSON.parse($momCalling) || JSON.parse($answeredCall))}
        <p
            class="background-blur border glow font-family-primary-fat"
            data-testid="answer-instruction"
            id="answer-instruction"
            transition:fade>
            {#if JSON.parse($momCalling)}
                Press <br />
                "C" <br />
                button to answer
            {:else}
                Press <br />
                "<span class="visually-hidden">▼</span><TriangleDown />"<br />
                button to show next message
            {/if}
        </p>
    {/if}
    {#if JSON.parse($answeredCall)}
        <TextConversation />
    {/if}
    <h2 class="visually-hidden">Phone</h2>
    <div class="relative">
        <PhoneCanvas />
        <picture><img src={phone} alt="nokia 3310 launched 2000" /></picture>
        {#if JSON.parse($momCalling)}
            <button
                data-testid="c-button"
                class="absolute glow opacity-flashing"
                on:click={() => {
                    $answeredCall = true
                    $momCalling = false
                    $phoneRingtonePaused = true
                }}>
                <span class="visually-hidden">answer call</span>
            </button>
        {/if}
    </div>
</section>

<style>
    picture {
        width: 200px;
    }
    button {
        --glow-color: var(--glow-pink);
        top: 240px;
        left: 28px;
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
        height: 100%;
        overflow-y: auto;
        display: grid;
        place-items: center;
        padding-top: 5em;
        padding-bottom: 4em;
    }
</style>
