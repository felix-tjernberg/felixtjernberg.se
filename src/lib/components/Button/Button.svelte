<script lang="ts">
    import { onDestroy } from "svelte"

    export let label: string

    export let active: "yes" | "no" | undefined = undefined
    export let ariaHidden: boolean = false
    export let blur: boolean = true
    export let border: boolean = true
    export let glow: boolean = true
    export let hoverOverlay: boolean = true
    export let href: string | undefined = undefined
    export let id: string | undefined = undefined
    export let style: string | undefined = undefined
    export let tabAble: boolean = true
    export let testid: string | undefined = undefined
    export let underlined: boolean = false

    const elementType: "a" | "button" = href ? "a" : "button"

    let icon = Boolean($$slots.icon)
    let timeoutTimers: ReturnType<typeof setTimeout>[] = []

    if (icon) glow = false
    if (underlined || icon) {
        border = false
        blur = false
    }

    const PROPS_CLASS_STRING = $$props.class ? $$props.class : undefined

    function handeMouseUp(event: { clientX: number; clientY: number; currentTarget: HTMLElement }) {
        if (active === "yes") return
        const buttonBoundingRectangle = event.currentTarget.getBoundingClientRect()
        let x = event.clientX - buttonBoundingRectangle.left
        let y = event.clientY - buttonBoundingRectangle.top
        const ripple = document.createElement("div")
        ripple.classList.add("ripple")
        ripple.style.left = x + "px"
        ripple.style.top = y + "px"
        event.currentTarget.appendChild(ripple)
        const timeoutId = setTimeout(() => {
            ripple.remove()
        }, 1000)
        timeoutTimers.push(timeoutId)
        timeoutTimers = timeoutTimers
    }

    onDestroy(() => {
        timeoutTimers.forEach((timer) => clearTimeout(timer))
    })
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<svelte:element
    this={elementType}
    aria-hidden={ariaHidden}
    class={PROPS_CLASS_STRING}
    class:button={true}
    class:active={active === "yes"}
    class:background-blur={blur}
    class:border
    class:flex-center={true}
    class:glow
    class:icon
    class:underlined
    class:un-active={active === "no"}
    data-testid={testid}
    {href}
    {id}
    on:click
    on:mouseup={handeMouseUp}
    {style}
    tabindex={tabAble ? 0 : -1}>
    {#if hoverOverlay}
        <div class="absolute hover-overlay" />
    {/if}
    {#if $$slots.icon}
        <slot name="icon" />
        <span class="visually-hidden">{label}</span>
    {:else}
        {label}
    {/if}
</svelte:element>

<style>
    .button {
        text-decoration: none;
        text-transform: capitalize;
        overflow: hidden;
        padding: 0.25em 1em;
        position: relative;
        font-family: var(--font-family-primary-fat);
    }
    :global([data-dark-mode="false"] button:not(.icon, .underlined)) {
        background-color: var(--white);
    }
    .button:hover:not(.active) .hover-overlay {
        opacity: 1;
    }
    .button.active:hover {
        cursor: not-allowed;
    }
    .button:active:not(.icon),
    .active:not(.icon) {
        background-color: var(--gray-900);
        color: var(--gray-000);
    }
    :global(button.icon.un-active path) {
        fill: transparent;
        stroke-width: 2.5px;
        stroke: var(--gray-900);
    }
    .hover-overlay {
        background-color: var(--gray-500-50-percent);
        inset: 0;
        opacity: 0;
        transition: opacity 420ms ease-in-out;
    }
    :global([data-dark-mode="false"] .hover-overlay) {
        background-color: var(--black-50-percent) !important;
    }
    .underlined {
        text-decoration: underline;
        --text-glow-size: 1.337px;
    }
    :global([data-dark-mode="false"] .glow.underlined) {
        filter: none;
    }
    .icon {
        padding: 0;
        overflow: visible;
    }
    .icon .hover-overlay {
        height: 100%;
        left: 50%;
        padding: 0.666em;
        top: 50%;
        translate: -50% -50%;
        width: 100%;
    }
    :global([data-dark-mode="false"] .glow.icon) {
        --glow-color: var(--white);
        --glow-size: 0;
    }
    :global(.ripple) {
        animation: ripple 1s cubic-bezier(0.2, 0.95, 1, 1.42);
        aspect-ratio: 1;
        background-color: var(--black);
        opacity: 0; /* Avoids a bug where square reappears */
        pointer-events: none;
        position: absolute;
        translate: -50% -50%;
        width: 100%;
    }
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 0.666;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
</style>
