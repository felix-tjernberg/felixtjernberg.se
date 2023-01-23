<script lang="ts">
    import { fade } from "svelte/transition"
    import { answeredCall, momCalling } from "$stores/phoneSectionStores"
    import { screenIndex, phoneRingtonePaused } from "$stores/computerSectionStores"
    import MultiDigitInput from "$components/MultiDigitInput/MultiDigitInput.svelte"
    import { onMount } from "svelte"

    let value: number
    let input: HTMLInputElement

    $: if (value === 200) $screenIndex = 6

    onMount(() => {
        input.focus()
        if (JSON.parse($answeredCall) === true) return
        $phoneRingtonePaused = false
        $momCalling = true
        $answeredCall = false
    })
</script>

<div class="flex-column-center gap" in:fade>
    <p class="font-family-primary-fat">How many miligrams of anakinra does mom need?</p>
    <MultiDigitInput label="anakinra" bind:value testid="mg-mom-needs-input" bind:input />
</div>
