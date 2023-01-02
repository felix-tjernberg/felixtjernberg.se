<script lang="ts">
    import Settings from "$assets/icons/Settings.svelte"
    import StarfieldBackground from "$components/StarfieldBackground.svelte"
    import Button from "./Button.svelte"
    import { FUNCTION_TEST_STRING } from "./FUNCTION_TEST_STRING"

    export let label: string

    export let blur: boolean = true
    export let glow: boolean = true
    export let underlined: boolean = false

    // test parameters for this wrapper only
    export let classTest: boolean = false
    export let functionTest: boolean = false
    export let iconTest: boolean = false
</script>

<div>
    <StarfieldBackground />
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
</div>

<style>
    div {
        position: relative;
        display: inline-block;
    }
    :global(canvas) {
        z-index: 0 !important;
        top: 0;
        left: 0;
    }
</style>
