<script lang="ts">
    import { z } from "zod"
    import Button from "$components/Button/Button.svelte"
    import DownArrow from "$assets/icons/DownArrow.svelte"
    import UpArrow from "$assets/icons/UpArrow.svelte"

    export let label: string

    export let value: number | "" | "-"
    export let max: number = 9999
    export let min: number = -9999
    export let placeholder: number = 0

    const NumberSchema = z.coerce.number().int().min(min).max(max).finite()

    let hyphenPressed = false
    let valueAsString = ""

    $: if (value === null && !hyphenPressed && valueAsString !== "-") value = ""
    $: if (value === null && hyphenPressed && valueAsString !== "-") {
        value = Number(valueAsString)
        hyphenPressed = false
    }
</script>

<div class="multi-digit-input flex-center">
    <label>
        <span class="visually-hidden">{label}</span>
        <input
            class="background-blur-000  white-glow"
            type="number"
            placeholder={String(placeholder)}
            {min}
            {max}
            bind:value
            on:keydown={(event) => {
                if (hyphenPressed) {
                    switch (event.key) {
                        case "1":
                            break
                        case "2":
                            break
                        case "3":
                            break
                        case "4":
                            break
                        case "5":
                            break
                        case "6":
                            break
                        case "7":
                            break
                        case "8":
                            break
                        case "9":
                            break
                        case "0":
                            break
                        case "Backspace":
                            break
                        default:
                            valueAsString = ""
                            value = ""
                    }
                }
                if (event.key === "-" && value !== null) {
                    hyphenPressed = true
                    if (NumberSchema.safeParse(value).success) {
                        const currentValue = Number(event.currentTarget.value)
                        if (String(currentValue) === "") {
                            valueAsString = "-"
                        } else if (currentValue === 0) {
                            valueAsString = "-"
                        } else if (currentValue > 0) {
                            value = Number(currentValue) * -1
                            valueAsString = String(value)
                        } else {
                            value = Math.abs(Number(currentValue))
                            valueAsString = String(value)
                        }
                    }
                }
            }} />
    </label>
    <div>
        <Button
            ariaHidden={true}
            label="increase"
            on:click={() => {
                if (valueAsString === "") {
                    value = 1
                    valueAsString = "1"
                    return
                }
                if (valueAsString === "-") {
                    value = 1
                    valueAsString = "1"
                    return
                }
                if (NumberSchema.safeParse(value).success && value !== null && value !== "-" && value !== "") value += 1
            }}>
            <UpArrow slot="icon" />
        </Button>
        <Button
            ariaHidden={true}
            label="decrease"
            on:click={() => {
                if (valueAsString === "") {
                    value = 1
                    valueAsString = String(value)
                    return
                }
                if (valueAsString === "-") return (valueAsString = "-1")
                if (NumberSchema.safeParse(value).success && value !== null && value !== "-" && value !== "")
                    return (value -= 1)
            }}>
            <DownArrow slot="icon" />
        </Button>
    </div>
</div>

<style>
    input {
        border-top: calc(1em * 0.1337) solid var(--gray-900);
        border-bottom: calc(1em * 0.1337) solid var(--gray-900);
        width: calc(100% + 48px);
    }
    :global(.multi-digit-input button:first-of-type svg) {
        margin-bottom: 0;
        translate: 0 calc(1em * 0.06685);
    }
    :global(.multi-digit-input button:last-of-type svg) {
        margin-top: 0;
    }
    :global([data-dark-mode="false"] .multi-digit-input svg path) {
        fill: var(--black);
    }
</style>
