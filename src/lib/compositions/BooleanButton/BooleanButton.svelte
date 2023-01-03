<script lang="ts">
    import Button from "$components/Button/Button.svelte"

    export let labels: string[]
</script>

<Button label={labels[0]} />
<Button label={labels[1]} />
