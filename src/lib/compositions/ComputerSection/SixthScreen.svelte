<script lang="ts">
    import { fade } from "svelte/transition"
    import { answeredCall, momCalling, phoneRingtonePaused } from "$stores/states/phone"
    import { computerScreenIndex } from "$stores/states/computer"
    import MultiDigitInput from "$components/MultiDigitInput/MultiDigitInput.svelte"
    import { onMount } from "svelte"

    let value: number
    let input: HTMLInputElement

    $: if (value === 200) $computerScreenIndex = 6

    onMount(() => {
        // input.focus()
        if ($answeredCall) return
        $phoneRingtonePaused = false
        $momCalling = true
        $answeredCall = false
    })
</script>

<div class="flex-column-center gap" in:fade>
    <p class="font-family-primary-fat">How many miligrams of anakinra does mom need?</p>
    <MultiDigitInput label="anakinra" bind:value testid="mg-mom-needs-input" bind:input />
</div>
