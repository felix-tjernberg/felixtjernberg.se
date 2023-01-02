<script lang="ts">
    import Settings from "$assets/icons/Settings.svelte"
    import Button from "./Button.svelte"

    export let label: string
    export let underlined: boolean
    export let iconTest: boolean = false
</script>

{#if iconTest}
    <Button {label} {underlined}>
        <Settings slot="icon" />
    </Button>
{:else}
    <Button {label} {underlined} />
{/if}
