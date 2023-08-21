<script lang="ts">
    import { searchParameters } from "$stores/searchParameters"
    export let excludeStates: readonly string[] = []
</script>

{#each $searchParameters.filter((element) => !excludeStates.includes(element.name)) as { name, value }}
    <input type="hidden" {name} {value} />
{/each}
