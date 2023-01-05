<script lang="ts">
    import { z } from "zod"

    export let label: string

    export let value: number | "" | "-" = 1337
    export let max: number = 9999
    export let min: number = -9999
    export let placeholder: number = 0

    const NumberSchema = z.coerce.number().int().min(min).max(max).finite()

    let hyphenPressed = false
    let valueAsString = String(value)

    $: if (value === null && !hyphenPressed && valueAsString !== "-") value = ""
    $: if (value === null && hyphenPressed && valueAsString !== "-") {
        value = Number(valueAsString)
        hyphenPressed = false
    }
</script>

<label>
    <span class="visually-hidden">{label}</span>
    <input
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
