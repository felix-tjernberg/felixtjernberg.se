<script lang="ts">
    import { NavigationSchema, type NavigationStates } from "$stores/states/navigation"
    import { scavengerHuntState } from "$stores/states/scavengerHuntState"
    import ContactSection from "./ContactSection.svelte"

    let navigationState: NavigationStates = NavigationSchema.enum.contact

    $scavengerHuntState = false

    const data = { email: "email@felix.se", phoneNumber: "0123456789" }
</script>

<div>
    <p class="visually-hidden" data-testid="navigation-indicator">{navigationState}</p>
    <button class="visually-hidden" data-testid="scavenger-hunt-button" on:click={() => ($scavengerHuntState = true)}>
        scavenger-hunt-button</button>
    <ContactSection {data} />
</div>

<style>
    div {
        height: 97vh;
        width: 97vw;
    }
</style>
