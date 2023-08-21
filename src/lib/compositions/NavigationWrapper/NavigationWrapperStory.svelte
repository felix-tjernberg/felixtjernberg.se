<script lang="ts">
    import NavigationWrapper from "./NavigationWrapper.svelte"
    import { navigationState, NavigationSchema } from "$stores/states/navigation"

    let navigationActive: boolean

    $navigationState = NavigationSchema.enum.navigation
</script>

<div id="navigation-wrapper-story" class="relative">
    <NavigationWrapper bind:navigationActive>
        <section slot="phone">
            <p>phone</p>
        </section>
        <section slot="blog">
            <p>blog</p>
        </section>
        <section slot="computer">
            <p>computer</p>
        </section>
        <section slot="coach">
            <p>coach</p>
        </section>
        <section slot="contact">
            <p>contact</p>
        </section>
    </NavigationWrapper>
    <button
        class="absolute"
        class:visually-hidden={navigationActive}
        on:click={() => ($navigationState = NavigationSchema.enum.navigation)}
        data-testid="toggle-navigation">open navigation</button>
    <button
        class="absolute visually-hidden"
        on:click={() => ($navigationState = NavigationSchema.enum.coach)}
        data-testid="switch-section">switch section programmatically</button>
</div>

<style>
    :global(#navigation-wrapper-story > div > div > svg) {
        height: 33%;
        width: 33%;
        margin: auto;
    }
    #navigation-wrapper-story {
        height: 100%;
    }
    button {
        top: 0;
        left: 50%;
        translate: -50%;
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
    section[slot="blog"] {
        background-color: rgba(0, 0, 255, 0.238);
    }
    section[slot="coach"] {
        background-color: rgba(255, 255, 0, 0.238);
    }
    section[slot="contact"] {
        background-color: rgba(255, 0, 255, 0.238);
    }
</style>
