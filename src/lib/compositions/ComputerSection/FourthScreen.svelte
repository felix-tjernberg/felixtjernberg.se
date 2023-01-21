<script lang="ts">
    import { fade } from "svelte/transition"
    import { onMount } from "svelte"
    import MultiDigitInput from "$components/MultiDigitInput/MultiDigitInput.svelte"

    export let screenIndex: number
    let value: number
    let input: HTMLInputElement

    $: if (value === 184 || value === 185) screenIndex = 4

    onMount(() => input.focus())
</script>

<div class="flex-column-center gap" in:fade>
    <iframe
        src="https://www.youtube-nocookie.com/embed/pgJXHhmN45Y?autoplay=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen />
    <p
        class="font-family-primary-fat font-size-000 padding-horizontal tex-transform-capitalize"
        style="--padding-amount: 4em">
        How many seconds is my friends song?<br />
        <span class="font-family-primary-thin">(Which I did the animations for)</span>
    </p>
    <MultiDigitInput label="answer" description="seconds using no decimals" bind:value bind:input />
</div>

<style>
    iframe {
        aspect-ratio: 16 / 9;
        max-width: 420px;
        width: 100%;
    }
</style>
