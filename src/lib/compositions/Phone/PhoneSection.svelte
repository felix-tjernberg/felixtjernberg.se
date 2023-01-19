<script lang="ts">
    import { fade } from "svelte/transition"
    import { momCalling } from "$utilities/stores/momCallingStore"
    import phone from "$assets/images/phone.png"
    import PhoneCanvas from "./PhoneCanvas.svelte"
    import TextConversation from "$components/TextConversation/TextConversation.svelte"
    import TriangleDown from "$assets/svgs/TriangleDown.svelte"

    $momCalling = true
    let conversationDone: boolean
    let answeredCall = false
</script>

<section id="phone-section" class="flex-column-center gap margin">
    {#if !conversationDone}
        <p id="answer-instruction" class="background-blur border glow font-family-primary-fat" transition:fade>
            {#if $momCalling}
                Press <br />
                "C" <br />
                button to answer
            {:else}
                Press <br />
                "<span class="visually-hidden">▼</span><TriangleDown />"<br />
                button for next message
            {/if}
        </p>
    {/if}
    {#if answeredCall}
        <TextConversation bind:conversationDone />
    {/if}
    <h2 class="visually-hidden">Phone</h2>
    <div class="relative">
        <PhoneCanvas answeredCall />
        <picture><img src={phone} alt="nokia 3310 launched 2000" /></picture>
        {#if $momCalling}
            <button
                class="absolute glow opacity-flashing"
                on:click={() => {
                    answeredCall = true
                    $momCalling = false
                }}><span class="visually-hidden">answer call</span></button>
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
</style>
