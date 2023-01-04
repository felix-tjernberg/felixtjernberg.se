<script lang="ts">
    import "../src/lib/stylesheets/stylesheets.css"
    import "./storybook.css"

    export let context: any
    let darkMode: boolean = false

    $: darkMode = context.backgrounds?.value === "#333333" || context.backgrounds?.value === "hsl(0, 0%, 10%)"
</script>

<div data-dark-mode={darkMode} data-testid="storybook-wrapper">
    <slot />
</div>
