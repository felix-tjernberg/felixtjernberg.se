<script lang="ts">
    import { z } from "zod"
    import lastDigitOfNumber from "$utilities/lastDigitOfNumber"

    export let label: string

    const SingleDigitBetween0and9 = z.coerce.number().int().min(0).max(9)

    export let value: number | "" = 0

    $: if (value === null) value = ""
    $: if (!SingleDigitBetween0and9.safeParse(value).success && value !== null) {
        switch (value) {
            case 10:
                value = 0
                break
            case -1:
                value = 9
                break
            default:
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
    }
</script>

<div>
    <label>
        <span class="visually-hidden">{label}</span>
        <button
            on:click={() => {
                // @ts-ignore
                value += 1
            }}
            data-testid="increase">
            increase
        </button>
        <input type="number" bind:value />
        <button
            on:click={() => {
                // @ts-ignore
                value -= 1
            }}
            data-testid="decrease">
            decrease
        </button>
    </label>
</div>

<style>
    input {
        -webkit-appearance: none;
        -moz-appearance: textfield;
        max-width: 1ch;
    }
    div {
        border-bottom: var(--stroke-200) solid var(--gray-900);
    }
</style>
