<script lang="ts">
    import { navigationState, NavigationSchema } from "$stores/states/navigation"
    import { scavengerHuntState } from "$stores/states/scavengerHuntState"

    $scavengerHuntState = true
</script>

<div class="flex-column-center gap padding-top-400">
    <p class="font-family-primary-fat">Congratu<wbr />lations!!!</p>
    <p class="font-family-primary-fat font-size-000">
        Phone number and email is now unlocked in the
        <a
            tabindex="-1"
            href="/contact"
            on:click|preventDefault={() => ($navigationState = NavigationSchema.enum.contact)}
            data-testid="contact-section-link">
            contact section
        </a>
    </p>
</div>

<style>
    div {
        width: 100%;
    }
</style>
