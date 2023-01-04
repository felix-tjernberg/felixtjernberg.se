<script lang="ts">
    import { onDestroy, onMount } from "svelte"

    export let label: string

    export let active: "yes" | "no" | undefined = undefined
    export let blur: boolean = true
    export let glow: boolean = true
    export let underlined: boolean = false

    let buttonElement: HTMLButtonElement
    let icon = Boolean($$slots.icon)
    let timeoutTimers: ReturnType<typeof setTimeout>[] = []

    const PROPS_CLASS_STRING = $$props.class ? $$props.class : ""
    if (PROPS_CLASS_STRING.includes("background-blur-")) blur = false

    onMount(() => {
        const buttonBoundingRectangle = buttonElement.getBoundingClientRect()
        buttonElement.addEventListener("mouseup", (event) => {
            let x = event.clientX - buttonBoundingRectangle.left
            let y = event.clientY - buttonBoundingRectangle.top
            const ripple = document.createElement("div")
            ripple.classList.add("ripple")
            ripple.style.left = x + "px"
            ripple.style.top = y + "px"
            buttonElement.appendChild(ripple)
            const timeoutId = setTimeout(() => {
                ripple.remove()
            }, 1000)
            timeoutTimers.push(timeoutId)
            timeoutTimers = timeoutTimers
        })
    })
    onDestroy(() => {
        timeoutTimers.forEach((timer) => clearTimeout(timer))
    })
</script>

<button
    bind:this={buttonElement}
    on:click
    class={PROPS_CLASS_STRING}
    class:active={active === "yes"}
    class:un-active={active === "no"}
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
    :global(.ripple) {
        animation: ripple 1s cubic-bezier(0.2, 0.95, 1, 1.42);
        aspect-ratio: 1;
        background-color: var(--black);
        opacity: 0.5;
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
    .active,
    .un-active {
        border: var(--stroke-200) solid var(--white);
        --glow-color: var(--white);
    }
    .active {
        background-color: var(--white);
        color: var(--black);
    }
    .un-active {
        background-color: var(--black-10-percent);
        color: var(--white);
    }
    button {
        position: relative;
        min-height: 48px;
        min-width: 48px;
        overflow: hidden;
    }
    button:hover,
    button:focus {
        background-color: var(--gray-500-50-percent);
    }
    button:active {
        background-color: var(--gray-500) !important;
    }
    :global([data-dark-mode="false"] button) {
        background-color: var(--gray-000-90-percent);
        border: none;
    }
    :global([data-dark-mode="false"] button:hover, [data-dark-mode="false"] button:focus) {
        background-color: var(--gray-000);
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
    :global([data-dark-mode="false"] .white-glow.underlined) {
        filter: none;
        text-shadow: none;
    }
    :global([data-dark-mode="false"] .white-glow.icon) {
        --glow-color: var(--gray-000);
    }
</style>
