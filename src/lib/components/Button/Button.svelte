<script lang="ts">
    export let label: string
    export let underlined: boolean

    let icon = Boolean($$slots.icon)
</script>

<button class:underlined class:icon>
    {#if $$slots.icon}
        <slot name="icon" />
        <span class="visually-hidden">{label}</span>
    {:else}
        {label}
    {/if}
</button>

<style>
    button {
        min-height: 48px;
        min-width: 48px;
    }
    .underlined,
    .icon {
        border: none;
    }
    .underlined {
        text-decoration: underline;
        font-family: var(--font-secondary);
    }
    .icon {
        background-color: transparent;
        padding: 0;
        height: 1em;
        width: 1em;
    }
</style>
