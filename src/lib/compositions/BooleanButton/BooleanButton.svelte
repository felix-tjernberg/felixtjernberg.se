<script lang="ts">
    import Button from "$components/Button/Button.svelte"

    export let labels: string[]
    export let description: string | undefined
    export let boolean: boolean = true
</script>

<div class="flex-center-column">
    {#if description}
        <p>{description}</p>
    {/if}
    <div>
        <Button active={boolean ? "yes" : "no"} label={labels[0]} on:click={() => (boolean = true)} />
        <Button active={!boolean ? "yes" : "no"} label={labels[1]} on:click={() => (boolean = false)} />
    </div>
</div>

<style>
    p {
        max-width: 50ch;
        translate: -1em -0.5em;
        rotate: -7.2deg;
        text-align: left;
    }
</style>
