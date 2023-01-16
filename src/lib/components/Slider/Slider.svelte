<script lang="ts">
    import Thumb from "$assets/svgs/Thumb.svelte"
    export let label: string
    export let description: string | undefined = undefined
    export let max: number = 1
    export let min: number = 0
    export let step: number = 0.01
    export let value: number = 0.1337
</script>

<div class="slider flex-column-center">
    {#if description}
        <p>{description}</p>
    {/if}
    <label>
        <span class="visually-hidden">{label}</span>
        <div class="slider-wrapper relative glow glow-hover" style={`--thumb-position-left: ${value * 100}%`}>
            <input type="range" {max} {min} {step} bind:value />
            <Thumb />
        </div>
    </label>
</div>

<style>
    p {
        color: var(--white);
        max-width: 100%;
        padding-top: 1em;
        rotate: -1.72deg;
        text-align: left;
        translate: -1em 0;
        width: auto;
    }
    /* Selectors has to be separate for some reason */
    input::-webkit-slider-thumb {
        opacity: 0;
    }
    input::-moz-range-thumb {
        opacity: 0;
    }
    input {
        appearance: auto;
        -webkit-appearance: none;
        -moz-appearance: none;
        /* Properties above needs to be in order */
        background: transparent;
        cursor: pointer;
        display: block;
        width: 100%;
    }
    .slider-wrapper {
        --slider-max-width: 300px;
        max-width: var(--slider-max-width);
        width: 100%;
    }
    .slider-wrapper:after,
    .slider-wrapper:before,
    :global(.slider-wrapper svg) {
        pointer-events: none;
        position: absolute;
        top: 50%;
    }
    .slider-wrapper:after,
    .slider-wrapper:before {
        content: "";
        height: 0.5em;
        left: 0;
        translate: 0 -50%;
    }
    .slider-wrapper:before {
        background-color: var(--gray-200);
        border: var(--stroke-200) solid var(--gray-900);
        width: 100%;
    }
    .slider-wrapper:after {
        background-color: var(--gray-900);
        width: var(--thumb-position-left);
    }
    :global(.slider-wrapper svg) {
        height: 1.5em;
        left: var(--thumb-position-left);
        translate: -50% -50%;
        width: 1.5em;
        z-index: 1;
    }
</style>
