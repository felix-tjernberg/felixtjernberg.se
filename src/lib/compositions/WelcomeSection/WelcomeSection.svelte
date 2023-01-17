<script lang="ts">
    import type { Sections } from "$compositions/NavigationWrapper/NavigationSectionsSchema"
    import { SectionsSchema } from "$compositions/NavigationWrapper/NavigationSectionsSchema"

    export let activeSection: Sections
</script>

<section id="welcome-section">
    <div class="border background-blur margin-vertical-flow glow flex-column-center">
        <a href="/coach" on:click|preventDefault={() => (activeSection = SectionsSchema.enum.coach)}>Coach</a>
    </div>
</section>

<style>
</style>
