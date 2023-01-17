<script lang="ts">
    import type { Sections } from "$compositions/NavigationWrapper/NavigationSectionsSchema"
    import { SectionsSchema } from "$compositions/NavigationWrapper/NavigationSectionsSchema"
    import WelcomeSection from "./WelcomeSection.svelte"

    let activeSection: Sections
</script>

<div>
    <p class="visually-hidden" data-testid="navigation-indicator">{activeSection}</p>
    <WelcomeSection {activeSection} />
</div>

<style>
    div {
        height: 97vh;
        width: 97vw;
    }
</style>
