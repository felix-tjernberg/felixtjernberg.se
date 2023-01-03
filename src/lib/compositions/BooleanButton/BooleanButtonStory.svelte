<script lang="ts">
    import BooleanButton from "./BooleanButton.svelte"
    import StarfieldBackgroundStoryWrapper from "$lib/stories/StarfieldBackgroundStoryWrapper.svelte"

    export let labels: string[] = ["hello", "world"]
</script>

<StarfieldBackgroundStoryWrapper>
    <BooleanButton {labels} />
</StarfieldBackgroundStoryWrapper>
