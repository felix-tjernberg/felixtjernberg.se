<script lang="ts">
    import BooleanButton from "./BooleanButton.svelte"
    import StarfieldBackgroundStoryWrapper from "$lib/stories/StarfieldBackgroundStoryWrapper.svelte"

    export let description: string = "Greet the world"
    export let labels: string[] = ["hello", "world"]
</script>

<StarfieldBackgroundStoryWrapper>
    <div>
        <BooleanButton {labels} {description} />
    </div>
</StarfieldBackgroundStoryWrapper>

<style>
    div {
        font-size: var(--font-size-300);
    }
</style>
