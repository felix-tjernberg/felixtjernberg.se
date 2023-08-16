<script lang="ts">
    import TextInput from "$components/TextInput/TextInput.svelte"
    import { fade } from "svelte/transition"

    let input: HTMLInputElement
    let value: string

    // TODO $: if (String(value).toLowerCase() === "yes") $computerScreenIndex = 3
</script>

<div id="third-screen" class="flex-column height-100percent" in:fade>
    <p class="font-family-primary-fat padding-horizontal text-transform-capitalize">
        Are you ready to start the scavenger hunt?
    </p>
    <TextInput
        label="answer"
        placeholder={'type "yes" here'}
        bind:value
        bind:input
        testid="start-scavenger-hunt-text-input" />
</div>

<style>
    #third-screen {
        max-height: calc(100vh - var(--static-scale-300));
        overflow-y: auto;
    }
    #third-screen > p {
        margin-top: auto;
    }
    #third-screen > :global(label) {
        margin-bottom: auto;
    }
</style>
