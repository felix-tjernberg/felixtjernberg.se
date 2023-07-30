<script lang="ts">
    import TextInput from "$components/TextInput/TextInput.svelte"
    import { onMount } from "svelte"
    import { fade } from "svelte/transition"
    import { computerScreenIndex } from "$stores/states/computer"

    let input: HTMLInputElement
    let value: string

    $: if (String(value).toLowerCase() === "yes") $computerScreenIndex = 3
    // onMount(() => { input.focus()})
</script>

<div class="flex-column-center gap" in:fade>
    <p class="font-family-primary-fat padding-horizontal text-transform-capitalize">
        Are you ready to start the scavenger hunt?
    </p>
    <TextInput label="answer" placeholder="Yes" bind:value bind:input testid="start-scavenger-hunt-text-input" />
</div>
