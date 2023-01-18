<script lang="ts">
    import { z } from "zod"
    import lastDigitOfNumber from "$utilities/lastDigitOfNumber"

    import Button from "$components/Button/Button.svelte"
    import DownArrow from "$assets/svgs/DownArrow.svelte"
    import UpArrow from "$assets/svgs/UpArrow.svelte"

    export let label: string

    const SingleDigitBetween0and9 = z.coerce.number().int().min(0).max(9)

    export let value: number | "" = 0

    $: if (value === null) value = ""
    $: if (!SingleDigitBetween0and9.safeParse(value).success && value !== null) {
        switch (lastDigitOfNumber(Number(value))) {
            case 0:
                value = 0
                break
            case 1:
                value = 1
                break
            case 2:
                value = 2
                break
            case 3:
                value = 3
                break
            case 4:
                value = 4
                break
            case 5:
                value = 5
                break
            case 6:
                value = 6
                break
            case 7:
                value = 7
                break
            case 8:
                value = 8
                break
            case 9:
                value = 9
                break
            default:
                value = ""
        }
    }
</script>

<div class="single-digit-input relative">
    <div class="absolute">
        <Button
            ariaHidden={true}
            class="absolute"
            label="increase"
            testid="increase-button"
            tabAble={false}
            on:click={() => {
                if (value === 9) return (value = 0)
                // @ts-ignore
                value += 1
            }}>
            <UpArrow slot="icon" />
        </Button>
    </div>
    <label class="glow glow-hover" data-testid="input-label">
        <span class="visually-hidden">{label}</span>
        <div class="bottom-stroke">
            <input class="border" type="number" bind:value placeholder="0" min="0" max="9" />
        </div>
    </label>
    <div class="absolute">
        <Button
            ariaHidden={true}
            label="decrease"
            testid="decrease-button"
            tabAble={false}
            on:click={() => {
                if (value === 0) return (value = 9)
                // @ts-ignore
                value -= 1
            }}>
            <DownArrow slot="icon" />
        </Button>
    </div>
</div>

<style>
    .single-digit-input {
        font-size: var(--relative-scale-200);
    }
    input {
        --stroke-width: 0;
        font-family: var(--font-family-primary-fat);
        height: 1em;
        max-width: 1ch;
    }
    :global([data-dark-mode="false"] .single-digit-input input) {
        --stroke-width: var(--stroke-100) 0;
        background-color: var(--white);
    }
    :global([data-dark-mode="false"] .single-digit-input) {
        backdrop-filter: none;
    }
    .bottom-stroke {
        position: relative;
    }
    .bottom-stroke::after {
        background-color: var(--gray-900);
        content: "";
        height: var(--stroke-200);
        inset: 0;
        margin: auto;
        opacity: 1;
        position: absolute;
        scale: 1;
        translate: -0.1ch 0.65em;
        width: 2.5ch;
    }
    :global([data-dark-mode="false"] .single-digit-input .bottom-stroke::after) {
        display: none;
    }
    .single-digit-input:hover .bottom-stroke::after {
        opacity: 0;
        scale: 0;
    }
    .bottom-stroke::after,
    :global(.single-digit-input button svg) {
        transition: all 0.15s ease-in-out;
    }
    :global(.single-digit-input button svg) {
        opacity: 0;
        scale: 0;
    }
    :global(.single-digit-input:hover button svg),
    :global(.single-digit-input .absolute:hover button svg) {
        opacity: 1;
        scale: 1;
    }
    .absolute {
        height: 100%;
        width: 100%;
        translate: -0.1ch;
    }
    .absolute:first-of-type {
        top: -100%;
    }
    .absolute:last-of-type {
        bottom: -100%;
    }
    :global(.single-digit-input > .absolute:first-of-type svg) {
        margin-bottom: var(--stroke-200);
    }
    :global(.single-digit-input > .absolute:last-of-type svg) {
        margin-top: var(--stroke-200);
    }
</style>
