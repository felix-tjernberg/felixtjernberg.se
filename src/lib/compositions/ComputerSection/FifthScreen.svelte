<script lang="ts">
    import Coach from "$components/Coach/Coach.svelte"
    import SingleDigitInput from "$components/SingleDigitInput/SingleDigitInput.svelte"
    import { fade } from "svelte/transition"
    import { screenIndex } from "$stores/computerSectionStores"
    import { onMount } from "svelte"

    let value: number
    let input: HTMLInputElement

    $: if (value === 3) $screenIndex = 5
    // onMount(() => input.focus())
</script>

<div id="fifth-screen" class="flex-column-center relative" in:fade>
    <Coach />
    <p class="font-family-primary-fat padding text-transform-capitalize">
        How many years did <br />
        Felix Tjernberg <br />
        coach american football?
    </p>
    <SingleDigitInput bind:input label="years felix coached" bind:value testid="coach-years-number-input" />
</div>

<style>
    p {
        z-index: 1;
        background-color: var(--gray-000-50-percent);
    }
    #fifth-screen {
        overflow: hidden;
        height: 100%;
    }
    :global(#fifth-screen > :nth-child(1)) {
        opacity: 0.337;
    }
</style>
