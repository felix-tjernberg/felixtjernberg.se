<script lang="ts">
    import DownArrow from "$assets/svgs/DownArrow.svelte"
    import UpArrow from "$assets/svgs/UpArrow.svelte"

    import Button from "$components/Button/Button.svelte"
    import Description from "$components/Description.svelte"

    import { z } from "zod"

    export let label: string
    export let input: HTMLInputElement | undefined = undefined

    export let description: string
    export let noScriptDescription: string | undefined = undefined
    export let placeholder: number = 0
    export let max: number = 9999
    export let min: number = -9999
    export let testid: string | undefined = undefined
    export let value: number | "" | "-"

    const NumberSchema = z.coerce.number().int().min(min).max(max).finite()

    let hyphenPressed = false
    let valueAsString = ""

    $: if (value === null && !hyphenPressed && valueAsString !== "-") value = ""
    $: if (value === null && hyphenPressed && valueAsString !== "-") {
        value = Number(valueAsString)
        hyphenPressed = false
    }
</script>

<Description {description} noScriptDescription={noScriptDescription ? noScriptDescription : description}>
    <div class=" multi-digit-input relative flex-center">
        <label>
            <span class="visually-hidden">{label}</span>
            <input
                tabindex="-1"
                class="background-blur glow border-vertical"
                type="number"
                data-testid={testid}
                placeholder={String(placeholder)}
                {min}
                {max}
                bind:this={input}
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
        <div class="multi-digit-input-arrows flex-column-center absolute">
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
                    if (NumberSchema.safeParse(value).success && value !== null && value !== "-" && value !== "")
                        value += 1
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
</Description>

<style>
    input {
        --total-numbers: 5ch;
        width: calc(var(--total-numbers) + 2ch);
    }
    :global([data-dark-mode="false"] .multi-digit-input input) {
        background-color: var(--white);
    }
    .multi-digit-input {
        font-family: var(--font-family-primary-fat);
    }
    .multi-digit-input-arrows {
        right: 0;
        translate: 100%;
    }
    :global(.multi-digit-input button) {
        transition: all 0.15s ease-in-out;
    }
    :global(.multi-digit-input button) {
        opacity: 0;
        scale: 0;
    }
    :global(.multi-digit-input:hover button) {
        opacity: 1;
        scale: 1;
    }
    :global(.multi-digit-input button:first-of-type svg) {
        margin-bottom: 0;
    }
    :global(.multi-digit-input button:last-of-type svg) {
        margin-top: 0;
    }
</style>
