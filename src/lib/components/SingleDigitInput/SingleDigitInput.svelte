<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import DownArrow from "$assets/svgs/DownArrow.svelte"
    import UpArrow from "$assets/svgs/UpArrow.svelte"

    import { browser } from "$app/environment"

    export let label: string
    export let name: string

    export let input: HTMLInputElement | undefined = undefined
    export let testid: string | undefined = undefined
    export let value: string = ""
</script>

<div class="single-digit-input flex-column-center">
    {#if browser}
        <Button
            ariaHidden={true}
            label="increase"
            testid="increase-button"
            type="button"
            tabindex="-1"
            on:click={() => {
                if (Number(value) >= 9) return (value = "0")
                value = String(Number(value) + 1)
            }}>
            <UpArrow slot="icon" />
        </Button>
    {/if}
    <label class="glow glow-hover font-family-primary-fat" data-testid="input-label">
        <span class="visually-hidden">{label}</span>
        <div class="bottom-stroke">
            <input
                class="border"
                type="number"
                {name}
                bind:value
                placeholder="0"
                min="0"
                max="9"
                data-testid={testid}
                bind:this={input} />
        </div>
    </label>
    {#if browser}
        <Button
            ariaHidden={true}
            label="decrease"
            testid="decrease-button"
            type="button"
            tabindex="-1"
            on:click={() => {
                if (Number(value) <= 0) return (value = "9")
                value = String(Number(value) - 1)
            }}>
            <DownArrow slot="icon" />
        </Button>
    {/if}
</div>

<style>
    .single-digit-input {
        font-size: var(--relative-scale-200);
    }
    input {
        --stroke-width: 0;
        height: 1em;
        max-width: 1ch;
    }
    label:nth-child(1) {
        margin-top: 1em;
        margin-bottom: 1em;
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
        translate: -0.05ch 0.65em;
        width: 1.1ch;
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
    :global(.single-digit-input button:hover svg) {
        opacity: 1;
        scale: 1;
    }
    :global(.single-digit-input > :first-of-type svg) {
        margin-bottom: var(--stroke-100);
    }
    :global(.single-digit-input > :last-of-type svg) {
        margin-top: var(--stroke-100);
    }
</style>
