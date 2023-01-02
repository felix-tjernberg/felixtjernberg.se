<script lang="ts">
    import Settings from "$assets/icons/Settings.svelte"
    import Button from "./Button.svelte"
    import { FUNCTION_TEST_STRING } from "./FUNCTION_TEST_STRING"

    export let label: string
    export let underlined: boolean

    // test parameters for this wrapper only
    export let iconTest: boolean = false
    export let functionTest: boolean = false
</script>

{#if iconTest}
    <Button {label}>
        <Settings slot="icon" />
    </Button>
{:else if functionTest}
    <Button {label} on:click={() => console.log(FUNCTION_TEST_STRING)} />
{:else}
    <Button {label} {underlined} />
{/if}
