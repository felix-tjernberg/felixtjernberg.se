<script lang="ts">
    import { activeSection } from "$stores/activeSectionStore"
    import { SectionsSchema } from "$compositions/NavigationWrapper/NavigationSectionsSchema"
    import { scavengerHuntDone } from "$stores/scavengerHuntDoneStore"

    $scavengerHuntDone = true
</script>

<div class="flex-column-center gap padding-top-400">
    <p class="font-family-primary-fat">Congratu<wbr />lations!!!</p>
    <p class="font-family-primary-fat font-size-000">
        Phone number and email is now unlocked in the
        <a
            tabindex="-1"
            href="/contact"
            on:click|preventDefault={() => ($activeSection = SectionsSchema.enum.contact)}
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
