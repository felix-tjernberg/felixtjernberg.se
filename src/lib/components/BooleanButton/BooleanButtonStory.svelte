<script lang="ts">
    import BooleanButton from "./BooleanButton.svelte"
    import StarfieldBackgroundStoryWrapper from "$lib/stories/StarfieldBackgroundStoryWrapper.svelte"
    import Settings from "$assets/icons/SettingsIcon.svelte"

    export let description: string | undefined
    export let labels: string[] = ["hello", "world"]

    export let booleanTest: boolean = false
    export let iconTest: boolean = false

    let testBoolean: boolean = true
</script>

<StarfieldBackgroundStoryWrapper>
    <div>
        {#if booleanTest}
            <BooleanButton {labels} description={testBoolean ? "true" : "false"} bind:boolean={testBoolean} />
        {:else if iconTest}
            <BooleanButton {labels} {description} bind:boolean={testBoolean}>
                <Settings slot="firstIcon" />
                <Settings slot="secondIcon" />
            </BooleanButton>
        {:else}
            <BooleanButton {labels} {description} />
        {/if}
    </div>
</StarfieldBackgroundStoryWrapper>

<style>
    div {
        font-size: var(--static-scale-300);
    }
</style>
