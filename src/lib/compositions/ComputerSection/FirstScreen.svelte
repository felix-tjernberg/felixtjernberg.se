<script lang="ts">
    import SingleDigitInput from "$components/SingleDigitInput/SingleDigitInput.svelte"
    import { screenIndex } from "$stores/computerSectionStores"
    import { onMount } from "svelte"

    let pin: string
    let input: HTMLInputElement

    let pin1: number | "" | undefined = undefined
    let pin2: number | "" | undefined = undefined
    let pin3: number | "" | undefined = undefined
    let pin4: number | "" | undefined = undefined
    $: pin = `${pin1}${pin2}${pin3}${pin4}`
    $: if (pin === "1234") $screenIndex = 1
    onMount(() => input.focus())
</script>

<div id="first-screen" class="grid">
    <div id="top-left" class="flex-center">
        <p><span class="visually-hidden">corner number 1: </span>1000</p>
    </div>
    <div id="top-right" class="flex-center relative">
        <p><span class="visually-hidden">corner number 2: </span>200</p>
    </div>
    <div id="bottom-left" class="flex-center relative">
        <p><span class="visually-hidden">corner number 3: </span>30</p>
    </div>
    <div id="bottom-right" class="flex-center relative">
        <p><span class="visually-hidden">corner number 4: </span>4</p>
    </div>
    <div id="content" class="flex-column-center ">
        <p class="font-family-primary-fat">enter pin to log in</p>
        <div class="flex-center gap">
            <SingleDigitInput label="pin number 1" bind:value={pin1} testid="pin-input" bind:input />
            <SingleDigitInput label="pin number 2" bind:value={pin2} testid="pin-input" />
            <SingleDigitInput label="pin number 3" bind:value={pin3} testid="pin-input" />
            <SingleDigitInput label="pin number 4" bind:value={pin4} testid="pin-input" />
        </div>
    </div>
</div>

<style>
    #first-screen {
        height: 100%;
        width: 100%;
        margin: auto;
        display: grid;
        grid-template-columns: 100px auto 100px;
        grid-template-rows: 100px auto 100px;
        grid-template-areas:
            "top-left . top-right"
            "content content content"
            "bottom-left . bottom-right";
    }
    #top-left {
        grid-area: top-left;
        rotate: -6.66deg;
        translate: 10px 30px;
    }
    #top-right {
        grid-area: top-right;
        rotate: 6.66deg;
        translate: -10px 30px;
    }
    #bottom-left {
        grid-area: bottom-left;
        rotate: 6.9deg;
        translate: 6.9px 13.37px;
    }
    #bottom-right {
        grid-area: bottom-right;
        rotate: -7.2deg;
        translate: -6.66px 13.37px;
    }
    #bottom-left > p {
        translate: 0 -30px;
    }
    #bottom-right > p {
        translate: -20px -30px;
    }
    #content {
        grid-area: content;
        /* padding to match the height of the sticky-note increase button plus 1em which centers the content visually, 48px is the min height of a sticky note */
        padding-top: calc(1em + max(48px, 1em));
    }
</style>
