<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    let active = true
</script>

{#if active}
    <slot />
    <Button label="remove note" underlined={true} on:click={() => (active = false)} />
{/if}
