<script lang="ts">
    import { SectionsSchema, type Sections } from "$stores/states/activeSection"
    import { scavengerHuntDone } from "$stores/states/scavengerHuntDone"
    import ContactSection from "./ContactSection.svelte"

    let activeSection: Sections = SectionsSchema.enum.contact

    $scavengerHuntDone = false

    const data = { email: "email@felix.se", phoneNumber: "0123456789" }
</script>

<div>
    <p class="visually-hidden" data-testid="navigation-indicator">{activeSection}</p>
    <button class="visually-hidden" data-testid="scavenger-hunt-button" on:click={() => ($scavengerHuntDone = true)}>
        scavenger-hunt-button</button>
    <ContactSection {data} />
</div>

<style>
    div {
        height: 97vh;
        width: 97vw;
    }
</style>
