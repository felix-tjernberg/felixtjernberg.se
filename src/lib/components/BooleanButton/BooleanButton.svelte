<script lang="ts">
    import Button from "$components/Button/Button.svelte"

    export let labels: string[]

    export let boolean: boolean = true
    export let description: string | undefined = undefined
    export let testid: string | undefined = undefined

    let icons = Boolean($$slots.firstIcon && $$slots.secondIcon)
</script>

<div class="flex-column-center" data-testid={testid}>
    {#if description}
        <p>{description}</p>
    {/if}
    <div class="flex-center" class:icons>
        {#if icons}
            <Button active={boolean ? "yes" : "no"} label={labels[0]} on:click={() => (boolean = true)}>
                <slot name="firstIcon" slot="icon" />
            </Button>
            <Button active={!boolean ? "yes" : "no"} label={labels[1]} on:click={() => (boolean = false)}>
                <slot name="secondIcon" slot="icon" />
            </Button>
        {:else}
            <Button active={boolean ? "yes" : "no"} label={labels[0]} on:click={() => (boolean = true)} />
            <Button active={!boolean ? "yes" : "no"} label={labels[1]} on:click={() => (boolean = false)} />
        {/if}
    </div>
</div>

<style>
    p {
        color: var(--white);
        max-width: 100%;
        rotate: -1.72deg;
        text-align: left;
        translate: -1em -0.5em;
        width: auto;
    }
    .icons {
        gap: 1em;
    }
</style>
