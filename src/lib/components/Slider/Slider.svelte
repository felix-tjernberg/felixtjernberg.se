<script lang="ts">
    import Thumb from "$assets/svgs/Thumb.svelte"

    import { browser } from "$app/environment"
    import Description from "$components/Description.svelte"

    export let label: string
    export let name: string

    export let description: string
    export let noScriptDescription: string | false = false
    export let max: number = 1
    export let min: number = 0
    export let step: number = 0.01
    export let value: number = 0.1337
</script>

<Description {description} noScriptDescription={noScriptDescription ? noScriptDescription : description}>
    <label class="slider flex-column-center" data-js-available={browser}>
        <span class="visually-hidden">{label}</span>
        <div
            class="slider-wrapper relative glow glow-hover"
            style={`--thumb-position-left: ${Math.min((value / max) * 100, 100)}%`}>
            <input type="range" {name} {max} {min} {step} bind:value on:change />
            <Thumb />
        </div>
    </label>
</Description>

<style>
    /* ::-webkit-slider-thumb,::-moz-range-thumb selectors has to be separate for some reason */
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
    .slider[data-js-available="false"] .slider-wrapper > input {
        appearance: auto;
        -webkit-appearance: auto;
        -moz-appearance: auto;
    }
    .slider[data-js-available="false"] .slider-wrapper::after,
    .slider[data-js-available="false"] .slider-wrapper::before,
    :global(.slider[data-js-available="false"] .slider-wrapper > svg.thumb) {
        display: none;
    }
</style>
