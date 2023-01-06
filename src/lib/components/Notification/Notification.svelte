<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    export let active = false
    export let closeButton = true
</script>

{#if active}
    <aside>
        <slot />
        {#if closeButton}
            <Button label="close notification" underlined={true} on:click={() => (active = false)} />
        {/if}
    </aside>
{/if}
