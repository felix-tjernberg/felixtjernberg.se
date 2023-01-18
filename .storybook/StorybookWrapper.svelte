<script lang="ts">
    import "../src/lib/stylesheets/stylesheets.css"
    import "./storybook.css"
    import { darkMode as darkModeStore } from "../src/lib/utilities/stores/darkModeStore"
    import StarfieldBackgroundStoryWrapper from "$lib/stories/StarfieldBackgroundStoryWrapper.svelte"

    export let context: any

    let darkMode: boolean = true
    let starFieldBackground: boolean = false

    $: darkMode = context.backgrounds?.value === "#333333" || context.backgrounds?.value === "transparent"
    $: starFieldBackground = context.starField === "On"
    $: $darkModeStore = darkMode
</script>

<div data-dark-mode={darkMode} data-testid="storybook-wrapper">
    {#if starFieldBackground}
        <StarfieldBackgroundStoryWrapper>
            <slot />
        </StarfieldBackgroundStoryWrapper>
    {:else}
        <slot />
    {/if}
</div>
