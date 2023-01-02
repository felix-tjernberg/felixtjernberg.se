<script lang="ts">
    export let label: string
    export let underlined: boolean
</script>

<button class:underlined>{label}</button>

<style>
    .underlined {
        text-decoration: underline;
        border: none;
        font-family: var(--font-secondary);
    }
</style>
