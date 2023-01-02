<script lang="ts">
    export let label: string

    export let blur: boolean = true
    export let glow: boolean = true
    export let underlined: boolean = false

    let icon = Boolean($$slots.icon)

    const PROPS_CLASS_STRING = $$props.class ? $$props.class : ""
    if (PROPS_CLASS_STRING.includes("background-blur-")) blur = false
</script>

<button
    on:click
    class={PROPS_CLASS_STRING}
    class:background-blur-000={blur}
    class:icon
    class:underlined
    class:white-glow={glow}>
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
    :global([data-dark-mode="false"] button) {
        background-color: var(--gray-000-90-percent);
    }
    .underlined,
    .icon {
        border: none;
        backdrop-filter: none;
        background-color: transparent;
    }
    .underlined {
        text-decoration: underline;
        font-family: var(--font-secondary);
        --text-glow-size: 1.337px;
    }
    .icon {
        padding: 0;
        height: 1em;
        width: 1em;
    }
    :global([data-dark-mode="false"] button .white-glow.icon) {
        --glow-color: var(--white);
    }
</style>
