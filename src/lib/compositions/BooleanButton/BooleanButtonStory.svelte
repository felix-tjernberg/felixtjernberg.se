<script lang="ts">
    import BooleanButton from "./BooleanButton.svelte"
    import StarfieldBackgroundStoryWrapper from "$lib/stories/StarfieldBackgroundStoryWrapper.svelte"

    export let description: string | undefined
    export let labels: string[] = ["hello", "world"]

    // test property for this wrapper only
    export let booleanTest: boolean = false

    let testBoolean: boolean = true
</script>

<StarfieldBackgroundStoryWrapper>
    <div>
        {#if booleanTest}
            <BooleanButton {labels} description={testBoolean ? "true" : "false"} bind:boolean={testBoolean} />
        {:else}
            <BooleanButton {labels} {description} />
        {/if}
    </div>
</StarfieldBackgroundStoryWrapper>

<style>
    div {
        font-size: var(--font-size-300);
    }
</style>
