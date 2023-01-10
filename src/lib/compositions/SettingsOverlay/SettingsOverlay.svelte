<script lang="ts">
    import BooleanButton from "$components/BooleanButton/BooleanButton.svelte"
    import Slider from "$components/Slider/Slider.svelte"
    import Button from "$components/Button/Button.svelte"
    import SettingsText from "$assets/icons/SettingsText.svelte"
    import { fade } from "svelte/transition"

    let value = 0.5
    let eightParagrafBitFont = true
    let flickerSensitive = true
    let scavengerHuntDone = true
    let cookiesAllowed = true
</script>

<section id="settings" class="absolute ">
    <h2><span class="visually-hidden">settings</span><SettingsText /></h2>
    <div class="flex-column flex-center vertical-flow-300">
        <div>
            <h3>Volume</h3>
            <Slider label="Volume" bind:value />
        </div>
        <div>
            <h3>Do you like reading 8bit font?</h3>
            <BooleanButton labels={["yes", "no"]} bind:boolean={eightParagrafBitFont} />
        </div>
        <div>
            <h3>Are you flicker sensitive?</h3>
            <BooleanButton labels={["yes", "no"]} bind:boolean={flickerSensitive} />
        </div>
        <div>
            <h3>Changed your mind about cookies?</h3>
            <Button label="Yes delete cookies!" on:click={() => (cookiesAllowed = false)} />
        </div>
        {#if scavengerHuntDone}
            <div transition:fade={{ duration: 1337 }}>
                <h3>Want to do the scavenger hunt again?</h3>
                <Button label="restart scavenger hunt" on:click={() => (scavengerHuntDone = false)} />
            </div>
        {/if}
    </div>
</section>

<style>
    #settings {
        background-image: var(--gradient-90-percent);
        inset: 0;
        overflow-y: auto;
        overflow-x: hidden;
        display: grid;
        grid-template-rows: 66% 1fr;
        height: 100vh;
        padding-bottom: 10%;
    }
    #settings > h2 {
        height: 100%;
        width: 100%;
        translate: 0 25%;
    }
    :global(#settings h2 > svg) {
        height: 100%;
        width: 75%;
    }
    :global(#settings button) {
        margin-top: 12px;
    }
    #settings > div {
        border: var(--stroke-300) solid var(--gray-100);
        margin-left: auto;
        margin-right: auto;
        max-width: 50ch;
        padding: 2em 1em;
        margin-top: 10%;
    }
    #settings,
    #settings > div {
        backdrop-filter: blur(7px) saturate(50%);
    }
    :global([data-dark-mode="false"] #settings > div) {
        background-color: var(--white-50-percent);
    }
</style>
