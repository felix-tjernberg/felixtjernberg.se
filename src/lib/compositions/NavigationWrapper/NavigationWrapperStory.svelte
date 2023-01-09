<script lang="ts">
    import NavigationWrapper from "./NavigationWrapper.svelte"
    import { SectionsSchema } from "./NavigationSectionsSchema"
    import type { Sections } from "./NavigationSectionsSchema"

    let navigationActive: boolean
    let activeSection: Sections
</script>

<div class="relative">
    <NavigationWrapper bind:navigationActive bind:activeSection>
        <section slot="phone">
            <p>phone</p>
        </section>
        <section slot="computer">
            <p>computer</p>
        </section>
        <section slot="welcome">
            <p>welcome</p>
        </section>
        <section slot="coach">
            <p>coach</p>
        </section>
        <section slot="contact">
            <p>contact</p>
        </section>
    </NavigationWrapper>
    {#if activeSection !== SectionsSchema.enum.none}
        <button
            class="absolute"
            on:click={() => {
                activeSection = SectionsSchema.enum.none
            }}
            data-testid="toggle-navigation">open navigation</button>
    {/if}
    <button
        class="absolute visually-hidden"
        on:click={() => (activeSection = SectionsSchema.enum.coach)}
        data-testid="switch-section">switch section programmatically</button>
</div>

<style>
    button {
        top: 0;
        left: 50%;
        translate: -50%;
    }
    div {
        overflow: hidden;
        max-height: 100vh;
    }
    section {
        height: 100%;
        width: 100%;
        display: grid;
        place-content: center;
    }
    p {
        margin: auto;
        color: var(--white);
    }
    section[slot="phone"] {
        background-color: rgba(255, 0, 0, 0.238);
    }
    section[slot="computer"] {
        background-color: rgba(0, 255, 0, 0.238);
    }
    section[slot="welcome"] {
        background-color: rgba(0, 0, 255, 0.238);
    }
    section[slot="coach"] {
        background-color: rgba(255, 255, 0, 0.238);
    }
    section[slot="contact"] {
        background-color: rgba(255, 0, 255, 0.238);
    }
</style>
