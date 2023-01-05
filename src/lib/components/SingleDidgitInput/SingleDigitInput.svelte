<script lang="ts">
    import { z } from "zod"
    import lastDigitOfNumber from "$utilities/lastDigitOfNumber"

    import Button from "$components/Button/Button.svelte"
    import DownArrow from "$assets/icons/DownArrow.svelte"
    import UpArrow from "$assets/icons/UpArrow.svelte"

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

<label class="single-digit-input flex-center-column white-glow" data-testid="input-label">
    <Button
        ariaHidden={true}
        label="increase"
        on:click={() => {
            if (value === 9) return (value = 0)
            // @ts-ignore
            value += 1
        }}>
        <UpArrow slot="icon" />
    </Button>
    <span class="visually-hidden">{label}</span>
    <div class="bottom-stroke">
        <input type="number" bind:value placeholder="0" min="0" max="9" />
    </div>
    <Button
        ariaHidden={true}
        label="decrease"
        on:click={() => {
            if (value === 0) return (value = 9)
            // @ts-ignore
            value -= 1
        }}>
        <DownArrow slot="icon" />
    </Button>
</label>

<style>
    input {
        appearance: auto;
        -webkit-appearance: textfield;
        -moz-appearance: textfield;
        /* Properties above needs to be in order */
        font-size: calc(1em * 1.42);
        height: 1em;
        max-width: 1ch;
        text-align: center;
    }
    .bottom-stroke {
        position: relative;
    }
    .bottom-stroke::after {
        background-color: var(--gray-900);
        content: "";
        height: calc(1em * 0.1337);
        opacity: 1;
        position: absolute;
        inset: 0;
        margin: auto;
        translate: 0 0.6em;
        width: 1ch;
    }
    .single-digit-input:hover .bottom-stroke::after {
        opacity: 0;
    }
    :global(.single-digit-input button:first-of-type svg) {
        margin-bottom: 0;
        translate: 0 calc(1em * 0.06685);
    }
    :global(.single-digit-input button:last-of-type svg) {
        margin-top: 0;
    }
    :global(.single-digit-input button) {
        opacity: 0;
    }
    :global(.single-digit-input:hover button) {
        opacity: 1;
    }
    .single-digit-input:hover {
        border: 0;
    }
    .bottom-stroke::after,
    :global(.single-digit-input button) {
        transition: opacity 0.15s ease-in-out;
    }
</style>
