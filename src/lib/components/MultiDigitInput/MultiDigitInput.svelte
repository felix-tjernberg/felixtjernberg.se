<script lang="ts">
    import DownArrow from "$assets/svgs/DownArrow.svelte"
    import UpArrow from "$assets/svgs/UpArrow.svelte"

    import Button from "$components/Button/Button.svelte"
    import Description from "$components/Description.svelte"

    import { browser } from "$app/environment"

    export let label: string
    export let description: string
    export let name: string

    export let input: HTMLInputElement | undefined = undefined
    export let noScriptDescription: string | undefined = undefined
    export let placeholder: string = "0"
    export let max: number = 9999
    export let min: number = -9999
    export let testid: string | undefined = undefined
    export let value: string = ""
</script>

<Description {description} noScriptDescription={noScriptDescription ? noScriptDescription : description}>
    <div class=" multi-digit-input relative flex-center">
        <label>
            <span class="visually-hidden">{label}</span>
            <input
                class="background-blur glow border-vertical"
                type="number"
                data-testid={testid}
                {placeholder}
                {min}
                {max}
                {name}
                bind:this={input}
                bind:value />
        </label>
        {#if browser}
            <div class="multi-digit-input-arrows flex-column-center absolute">
                <Button
                    ariaHidden={true}
                    label="increase"
                    on:click={() => (value = String(Number(value) + 1))}
                    type="button">
                    <UpArrow slot="icon" />
                </Button>
                <Button
                    ariaHidden={true}
                    label="decrease"
                    on:click={() => (value = String(Number(value) - 1))}
                    type="button">
                    <DownArrow slot="icon" />
                </Button>
            </div>
        {/if}
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
        font-size: var(--relative-scale-200);
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
