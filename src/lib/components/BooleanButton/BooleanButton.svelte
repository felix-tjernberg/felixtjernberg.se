<script lang="ts">
    import Button from "$components/Button/Button.svelte"

    export let labels: string[]

    export let boolean: boolean = true
    export let description: string | undefined = undefined

    let icons = Boolean($$slots.firstIcon && $$slots.secondIcon)
</script>

<div class="flex-center-column">
    {#if description}
        <p>{description}</p>
    {/if}
    <div>
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
        max-width: 50ch;
        translate: -1em -0.5em;
        rotate: -7.2deg;
        text-align: left;
        color: var(--white);
    }
</style>
