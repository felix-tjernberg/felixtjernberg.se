<script lang="ts">
    import "../src/lib/stylesheets/stylesheets.css"
    import "./storybook.css"
    import { darkMode as darkModeStore } from "../src/lib/utilities/stores/settings/darkMode"
    import StarfieldBackground from "$lib/components/StarfieldBackground.svelte"

    export let context: any

    let darkMode: boolean = true
    let starFieldBackground: boolean = false

    $: darkMode = context.backgrounds?.value === "#333333" || context.backgrounds?.value === "transparent"
    $: starFieldBackground = context.starField === "On"
    $: $darkModeStore = darkMode
</script>

<div data-dark-mode={darkMode} data-testid="storybook-wrapper" class="grid-stack">
    {#if starFieldBackground}
        <StarfieldBackground />
        <slot />
    {:else}
        <slot />
    {/if}
</div>
