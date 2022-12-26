<script lang="ts">
    import { z } from "zod"
    const DEFAULT_VALUE = 0
    const valueSchema = z.number()

    export let count: number = DEFAULT_VALUE
    export let decrement: boolean = false
    export let step: number = 1
    if (step === 0) step = 1

    $: if (!valueSchema.safeParse(count).success) count = DEFAULT_VALUE

    const increment = () => {
        if (decrement) count -= step
        else count += step
    }
</script>

<button on:click={increment}>
    count is {count}
</button>
