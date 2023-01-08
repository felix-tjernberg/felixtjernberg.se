<script lang="ts">
    import { onMount } from "svelte"

    export let label: string
    export let placeholder: string = "Placeholder"

    let input: HTMLInputElement

    onMount(() => {
        input.style.width = `calc(2em + ${placeholder.length}ch)`
        input.style.caretColor = "transparent"
    })
</script>

<label>
    <span class="visually-hidden">{label}</span>
    <div class="strokes-wrapper white-glow">
        <input
            bind:this={input}
            type="text"
            {placeholder}
            on:input={(event) => {
                const input = event.currentTarget
                if (input.value.length === 0) {
                    input.style.width = `calc(2em + ${placeholder.length}ch)`
                } else {
                    input.style.width = `calc(2em + ${input.value.length}ch)`
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
        padding: 0.5em 1em;
        width: 15ch;
        font-variant-ligatures: no-common-ligatures;
    }
    .strokes-wrapper {
        --input-value-length: 0ch;
        position: relative;
    }
    .strokes-wrapper::before {
        background-color: var(--gray-900);
        content: "";
        height: calc(1em * 0.1337);
        left: var(--input-value-length);
        opacity: 0.5;
        position: absolute;
        top: 50%;
        translate: 0.97em 0.337em;
        width: 1.1ch;
    }
    .strokes-wrapper:focus-within::before {
        animation: blink 1.72s infinite;
    }
    @keyframes blink {
        0% {
            opacity: 0.5;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0.5;
        }
    }
    .strokes-wrapper::after {
        background-color: var(--gray-900);
        content: "";
        height: 2ch;
        left: 0.72em;
        opacity: 1;
        position: absolute;
        top: 50%;
        translate: 0 -50%;
        width: calc(1em * 0.1337);
    }
</style>
