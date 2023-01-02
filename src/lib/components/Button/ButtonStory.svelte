<script lang="ts">
    import Settings from "$assets/icons/Settings.svelte"
    import Button from "./Button.svelte"
    import { FUNCTION_TEST_STRING } from "./FUNCTION_TEST_STRING"

    export let label: string

    export let glow: boolean = true
    export let underlined: boolean = false

    // test parameters for this wrapper only
    export let classTest: boolean = false
    export let functionTest: boolean = false
    export let iconTest: boolean = false
</script>

{#if iconTest}
    <Button {label} {glow} {underlined}>
        <Settings slot="icon" />
    </Button>
{:else if functionTest}
    <Button {label} {glow} {underlined} on:click={() => console.log(FUNCTION_TEST_STRING)} />
{:else if classTest}
    <Button {label} {glow} {underlined} class="button-test-class" />
{:else}
    <Button {label} {glow} {underlined} />
{/if}

<style>
    :global(.button-test-class) {
        background-color: red;
    }
</style>
