<script lang="ts">
    import { fade } from "svelte/transition"
    import type { Sections } from "./NavigationSectionsSchema"
    import { SectionsSchema } from "./NavigationSectionsSchema"

    export let navigationActive: boolean = true
    export let activeSection: Sections = SectionsSchema.enum.none
    $: if (activeSection === SectionsSchema.enum.none) {
        navigationActive = true
    } else {
        navigationActive = false
    }
</script>

<div
    data-testid="navigation-wrapper"
    class="navigation"
    data-active-section={`${navigationActive ? SectionsSchema.enum.none : activeSection}`}>
    <div>
        {#if navigationActive}
            <a
                on:click|preventDefault={() => (activeSection = SectionsSchema.enum.phone)}
                transition:fade
                href={"/phone"}>
                phone
            </a>
        {/if}
        <slot name="phone" />
    </div>
    <div>
        {#if navigationActive}
            <a
                on:click|preventDefault={() => (activeSection = SectionsSchema.enum.computer)}
                transition:fade
                href={"/computer"}>
                computer
            </a>
        {/if}
        <slot name="computer" />
    </div>
    <div>
        {#if navigationActive}
            <a
                on:click|preventDefault={() => (activeSection = SectionsSchema.enum.welcome)}
                transition:fade
                href={"/welcome"}>
                welcome
            </a>
        {/if}
        <slot name="welcome" />
    </div>
    <div>
        {#if navigationActive}
            <a
                on:click|preventDefault={() => (activeSection = SectionsSchema.enum.coach)}
                transition:fade
                href={"/coach"}>
                coach
            </a>
        {/if}
        <slot name="coach" />
    </div>
    <div>
        {#if navigationActive}
            <a
                on:click|preventDefault={() => (activeSection = SectionsSchema.enum.contact)}
                transition:fade
                href={"/contact"}>
                contact
            </a>
        {/if}
        <slot name="contact" />
    </div>
</div>

<style>
    .navigation {
        display: grid;
        height: 100%;
        width: 100%;
        grid-template-columns: repeat(3, 100vw);
        grid-template-rows: repeat(3, 100vh);
        grid-template-areas:
            "phone . computer"
            ". welcome ."
            "coach . contact";
        translate: 0 -100vh;
        overflow: hidden;
        transition: all ease-in-out 0.5s;
    }
    .navigation div:nth-of-type(1) {
        grid-area: phone;
    }
    .navigation div:nth-of-type(2) {
        grid-area: computer;
    }
    .navigation div:nth-of-type(3) {
        grid-area: welcome;
    }
    .navigation div:nth-of-type(4) {
        grid-area: coach;
    }
    .navigation div:nth-of-type(5) {
        grid-area: contact;
    }
    [data-active-section="phone"] {
        translate: 100vw 0;
        scale: 1;
    }
    [data-active-section="computer"] {
        translate: -100vw;
        scale: 1;
    }
    [data-active-section="welcome"] {
        translate: 0 -100vh;
        scale: 1;
    }
    [data-active-section="coach"] {
        translate: 100vw -200vh;
        scale: 1;
    }
    [data-active-section="contact"] {
        translate: -100vw -200vh;
        scale: 1;
    }
    [data-active-section="none"] {
        scale: 0.3;
        translate: 0 -100vh;
    }
    .navigation > div {
        position: relative;
        margin: 3%;
    }
    .navigation > div > a {
        display: flex;
        place-content: center;
        align-items: center;
        position: absolute;
        inset: 0;
        max-width: none;
        max-width: none;
        font-size: var(--font-size-600);
    }
</style>
