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
    <button class="absolute" on:click={() => (navigationActive = true)} data-testid="toggle-navigation"
        >toggle navigation</button>
    <button class="absolute" on:click={() => (activeSection = SectionsSchema.enum.coach)} data-testid="switch-section"
        >switch section programmatically</button>
</div>

<style>
    button {
        top: 0;
        left: 50%;
        translate: -50%;
    }
    button:nth-of-type(2) {
        scale: 0;
    }
    div {
        overflow: hidden;
        max-height: 100vh;
    }
    section {
        height: 100%;
        width: 100%;
    }
    p {
        margin: auto;
    }
    section[slot="phone"] {
        background-color: red;
    }
    section[slot="computer"] {
        background-color: green;
    }
    section[slot="welcome"] {
        background-color: blue;
    }
    section[slot="coach"] {
        background-color: yellow;
    }
    section[slot="contact"] {
        background-color: purple;
    }
</style>
