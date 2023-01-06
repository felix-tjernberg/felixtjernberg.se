<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    export let active = false
    export let closeButton = true
</script>

{#if active}
    <aside class="notification background-blur-900 flex-center flex-column white-glow absolute">
        <slot />
        {#if closeButton}
            <Button label="close notification" underlined={true} on:click={() => (active = false)} />
        {/if}
    </aside>
{/if}

<style>
    aside {
        background-color: var(--gray-000-10-percent);
        border-left: 0.1337em solid var(--gray-900);
        border-right: 0.1337em solid var(--gray-900);
        color: var(--gray-900);
        font-family: var(--font-secondary);
        top: 1em;
        padding: 0.5em 1em;
        left: 50%;
        translate: -50%;
        width: 100%;
    }
    :global([data-dark-mode] aside) {
        background-color: var(--gray-000-90-percent);
    }
    :global(.notification button) {
        background-color: var(--gray-000) !important;
        height: 100%;
        left: 0;
        max-width: 100%;
        opacity: 0;
        position: absolute !important;
        top: 0;
        transition: opacity 420ms ease-in-out;
        width: 100%;
    }
    :global(.notification:hover button),
    :global(.notification button:focus) {
        opacity: 1;
    }
</style>
