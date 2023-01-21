<script lang="ts">
    import { fade } from "svelte/transition"
    import Button from "$components/Button/Button.svelte"
    export let active = false
    export let closeButton = true
</script>

{#if active}
    <aside class="notification background-blur flex-column-center glow absolute border-horizontal" transition:fade>
        <slot />
        {#if closeButton}
            <Button label="close notification" underlined={true} on:click={() => (active = false)} />
        {/if}
    </aside>
{/if}

<style>
    .notification {
        z-index: 9001;
        --background-blur-amount: var(--blur-900);
        --stroke-width: var(--stroke-200);
        color: var(--gray-900);
        left: 50%;
        min-height: 48px;
        min-width: 48px;
        padding: 0.5em 1em;
        scale: 1;
        top: 1em;
        transition: scale 420ms ease-in-out;
        translate: -50%;
    }
    :global([data-dark-mode="false"] .notification) {
        --glow-color: var(--white);
        --stroke-width: var(--stroke-400);
        --stroke-color: var(--gray-000);
    }
    :global(.notification button) {
        background-color: var(--gray-000) !important;
        font-family: var(--font-family-primary-thin) !important;
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
