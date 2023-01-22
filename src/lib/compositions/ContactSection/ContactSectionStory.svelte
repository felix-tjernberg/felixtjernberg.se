<script lang="ts">
    import type { Sections } from "$compositions/NavigationWrapper/NavigationSectionsSchema"
    import { SectionsSchema } from "$compositions/NavigationWrapper/NavigationSectionsSchema"
    import { scavengerHuntDone } from "$stores/scavengerHuntDoneStore"
    import ContactSection from "./ContactSection.svelte"

    let activeSection: Sections = SectionsSchema.enum.contact

    $scavengerHuntDone = false
</script>

<div>
    <p class="visually-hidden" data-testid="navigation-indicator">{activeSection}</p>
    <button class="visually-hidden" data-testid="scavenger-hunt-button" on:click={() => ($scavengerHuntDone = true)}>
        scavenger-hunt-button</button>
    <ContactSection bind:activeSection />
</div>

<style>
    div {
        height: 97vh;
        width: 97vw;
    }
</style>
