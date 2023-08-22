<script lang="ts">
    import { onMount } from "svelte"

    const PADDING_OFFSET = 2.674

    export let label: string
    export let name: string
    export let value: string = ""

    export let placeholder: string = "Placeholder"
    export let testid: string | undefined = undefined

    let input: HTMLInputElement
    onMount(() => {
        input.style.width = `calc(${PADDING_OFFSET}em + ${placeholder.length}ch)`
        input.style.caretColor = "transparent"
    })
</script>

<label class="margin-horizontal-auto">
    <span class="visually-hidden">{label}</span>
    <div class="strokes-wrapper glow glow-hover">
        <input
            data-testid={testid}
            {name}
            bind:value
            bind:this={input}
            type="text"
            {placeholder}
            on:input={(event) => {
                const input = event.currentTarget
                if (input.value.length === 0) {
                    input.style.width = `calc(${PADDING_OFFSET}em + ${placeholder.length}ch)`
                } else {
                    input.style.width = `calc(${PADDING_OFFSET}em + ${input.value.length}ch)`
                }
                input.parentElement?.style.setProperty("--input-value-length", `${input.value.length}ch`)
                input.setSelectionRange(input.value.length, input.value.length)
            }}
            on:click={(event) => {
                event.currentTarget.setSelectionRange(input.value.length, input.value.length)
                input.setSelectionRange(input.value.length, input.value.length)
            }}
            on:focus={(event) => {
                event.currentTarget.setSelectionRange(input.value.length, input.value.length)
                input.setSelectionRange(input.value.length, input.value.length)
            }} />
    </div>
</label>

<style>
    input {
        padding: 0.5em 1.337em;
        width: 15ch;
        font-variant-ligatures: no-common-ligatures;
    }
    .strokes-wrapper {
        --glow-size: var(--stroke-100);
        --input-value-length: 0ch;
        position: relative;
        font-family: var(--font-family-primary-fat);
    }
    .strokes-wrapper:hover {
        --glow-size: var(--stroke-300);
    }
    .strokes-wrapper::before {
        background-color: var(--gray-900);
        content: "";
        height: var(--stroke-100);
        left: var(--input-value-length);
        opacity: 0;
        position: absolute;
        top: 50%;
        translate: 1.25em 0.42em;
        width: 1.1ch;
    }
    .strokes-wrapper:focus-within::before {
        animation: blink 1.314s infinite;
    }
    @keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    .strokes-wrapper::after {
        background-color: var(--gray-900);
        content: "";
        height: 1.5ch;
        left: 0.72em;
        opacity: 1;
        position: absolute;
        top: 50%;
        translate: 0 -55%;
        width: var(--stroke-100);
    }
</style>
