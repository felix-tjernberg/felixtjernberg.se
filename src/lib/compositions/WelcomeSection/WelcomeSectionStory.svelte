<script lang="ts">
    import WelcomeSection from "./WelcomeSection.svelte"

    let activeSection = "TODO"
</script>

<div>
    <p class="visually-hidden" data-testid="navigation-indicator">{activeSection}</p>
    <WelcomeSection />
</div>

<style>
    div {
        height: 97vh;
        width: 97vw;
    }
</style>
