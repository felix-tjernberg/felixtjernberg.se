<script lang="ts">
    import Button from "$components/Button/Button.svelte"

    export let labels: string[]
    export let description: string
</script>

<div class="flex-center-column">
    <p>{description}</p>
    <div>
        <Button label={labels[0]} />
        <Button label={labels[1]} />
    </div>
</div>

<style>
    p {
        max-width: 50ch;
        translate: -0.5em -0.5em;
        rotate: -7.2deg;
    }
</style>
