<script lang="ts">
    import { fade } from "svelte/transition"
    import type { Sections } from "./NavigationSectionsSchema"
    import { SectionsSchema } from "./NavigationSectionsSchema"
    import Welcome from "$assets/icons/Welcome.svelte"
    import Phone from "$assets/icons/Phone.svelte"
    import Computer from "$assets/icons/Computer.svelte"
    import Coach from "$assets/icons/Coach.svelte"
    import Contact from "$assets/icons/Contact.svelte"
    import Logo from "$assets/icons/Logo.svelte"

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
                on:click|preventDefault={() => (activeSection = SectionsSchema.enum.coach)}
                transition:fade
                href={"/coach"}>
                <span class="visually-hidden">coach</span>
                <Coach />
            </a>
        {/if}
        <slot name="coach" />
    </div>
    <div>
        {#if navigationActive}
            <a
                on:click|preventDefault={() => (activeSection = SectionsSchema.enum.computer)}
                transition:fade
                href={"/computer"}>
                <span class="visually-hidden">computer</span>
                <Computer />
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
                <span class="visually-hidden">welcome</span>
                <Welcome />
            </a>
        {/if}
        <slot name="welcome" />
    </div>
    <div>
        {#if navigationActive}
            <a
                on:click|preventDefault={() => (activeSection = SectionsSchema.enum.phone)}
                transition:fade
                href={"/phone"}>
                <span class="visually-hidden">phone</span>
                <Phone />
            </a>
        {/if}
        <slot name="phone" />
    </div>
    <div>
        {#if navigationActive}
            <a
                on:click|preventDefault={() => (activeSection = SectionsSchema.enum.contact)}
                transition:fade
                href={"/contact"}>
                <span class="visually-hidden">contact</span>
                <Contact />
            </a>
        {/if}
        <slot name="contact" />
    </div>
    <div>
        <slot name="settings" />
    </div>
    {#if navigationActive}
        <Logo />
        <Logo />
    {/if}
</div>

<style>
    :global(.navigation > svg) {
        height: 75%;
        inset: 0;
        position: absolute;
        width: 75%;
        z-index: -1;
    }
    :global(.navigation > svg:nth-of-type(1)) {
        filter: blur(15vh);
    }
    .navigation {
        display: grid;
        grid-template-areas:
            "phone settings computer"
            ". welcome ."
            "coach . contact";
        grid-template-columns: repeat(3, 100vw);
        grid-template-rows: repeat(3, 100vh);
        height: 100%;
        overflow: hidden;
        transition: all ease-in-out 0.5s;
        translate: 0 -100vh;
        width: 100%;
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
    .navigation div:nth-of-type(6) {
        grid-area: settings;
    }
    [data-active-section="phone"],
    [data-active-section="computer"],
    [data-active-section="welcome"],
    [data-active-section="coach"],
    [data-active-section="contact"] {
        scale: 1;
    }
    [data-active-section="phone"] {
        translate: 100vw -200vh;
    }
    [data-active-section="computer"] {
        translate: -100vw;
    }
    [data-active-section="welcome"] {
        translate: 0 -100vh;
    }
    [data-active-section="coach"] {
        translate: 100vw 0;
    }
    [data-active-section="contact"] {
        translate: -100vw -200vh;
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
        inset: 0;
        max-width: none;
        max-width: none;
        position: absolute;
    }
    .navigation > div > a,
    .navigation > div:nth-of-type(6) {
        align-items: center;
        backdrop-filter: blur(4px) saturate(90%);
        display: flex;
        place-content: center;
        padding: 1em;
    }
    :global(.navigation > div > a > svg) {
        height: 75%;
        width: 75%;
    }
</style>
