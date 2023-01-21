<script lang="ts">
    import { activeSection } from "$utilities/stores/activeSectionStore"
    import { SectionsSchema } from "$compositions/NavigationWrapper/NavigationSectionsSchema"

    export let screenIndex: number
</script>

<div class="flex-column-center gap padding-top-400">
    <p class="font-family-primary-fat">Congratulations!!!</p>
    <p class="font-family-primary-fat font-size-000">
        Phone number and email is now unlocked in the
        <a href="/contact" on:click|preventDefault={() => ($activeSection = SectionsSchema.enum.coach)}>
            contact section
        </a>
    </p>
</div>
