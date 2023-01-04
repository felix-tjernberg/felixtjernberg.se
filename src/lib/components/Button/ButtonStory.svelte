<script lang="ts">
    import Settings from "$assets/icons/Settings.svelte"
    import Button from "./Button.svelte"
    import { FUNCTION_TEST_STRING } from "./FUNCTION_TEST_STRING"

    export let label: string

    export let blur: boolean = true
    export let glow: boolean = true
    export let underlined: boolean = false

    export let classTest: boolean = false
    export let functionTest: boolean = false
    export let iconTest: boolean = false
</script>

{#if iconTest}
    <Button {label} {glow} {blur} {underlined}>
        <Settings slot="icon" />
    </Button>
{:else if functionTest}
    <Button {label} {glow} {blur} {underlined} on:click={() => console.log(FUNCTION_TEST_STRING)} />
{:else if classTest}
    <Button {label} {glow} {blur} {underlined} />
    <div data-testid="class-test">
        <Button {label} {glow} {blur} {underlined} class="background-blur-500" />
    </div>
    <Button {label} {glow} {blur} {underlined} class="background-blur-900" />
{:else}
    <Button {label} {glow} {blur} {underlined} />
{/if}
