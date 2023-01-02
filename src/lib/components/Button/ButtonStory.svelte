<script lang="ts">
    import Button from "./Button.svelte"

    export let label: string
    export let underlined: boolean
</script>

<Button {label} {underlined} />
