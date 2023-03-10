<script lang="ts">
    import { fade } from "svelte/transition"
    import { activeSection } from "$stores/activeSectionStore"
    import { SectionsSchema } from "./NavigationSectionsSchema"
    import Welcome from "$assets/svgs/Welcome.svelte"
    import Phone from "$assets/svgs/Phone.svelte"
    import Computer from "$assets/svgs/Computer.svelte"
    import Coach from "$assets/svgs/Coach.svelte"
    import Contact from "$assets/svgs/Contact.svelte"
    import Logo from "$assets/svgs/Logo.svelte"

    export let navigationActive: boolean = true

    $: if ($activeSection === SectionsSchema.enum.none) {
        navigationActive = true
    } else {
        navigationActive = false
    }
</script>

<div
    data-testid="navigation-wrapper"
    id="navigation"
    data-active-section={`${navigationActive ? SectionsSchema.enum.none : $activeSection}`}>
    {#if navigationActive}
        <Logo />
        <Logo />
    {/if}
    <div id="navigation-item-coach">
        {#if navigationActive}
            <a
                tabindex="-1"
                on:click|preventDefault={() => ($activeSection = SectionsSchema.enum.coach)}
                transition:fade
                href={"/coach"}>
                <span class="visually-hidden">coach</span>
                <Coach />
            </a>
        {/if}
        <slot name="coach" />
    </div>
    <div id="navigation-item-computer">
        {#if navigationActive}
            <a
                tabindex="-1"
                on:click|preventDefault={() => ($activeSection = SectionsSchema.enum.computer)}
                transition:fade
                href={"/computer"}>
                <span class="visually-hidden">computer</span>
                <Computer />
            </a>
        {/if}
        <slot name="computer" />
    </div>
    <div id="navigation-item-welcome">
        {#if navigationActive}
            <a
                tabindex="-1"
                on:click|preventDefault={() => ($activeSection = SectionsSchema.enum.welcome)}
                transition:fade
                href={"/welcome"}>
                <span class="visually-hidden">welcome</span>
                <Welcome />
            </a>
        {/if}
        <slot name="welcome" />
    </div>
    <div id="navigation-item-phone">
        {#if navigationActive}
            <a
                tabindex="-1"
                on:click|preventDefault={() => ($activeSection = SectionsSchema.enum.phone)}
                transition:fade
                href={"/phone"}>
                <span class="visually-hidden">phone</span>
                <Phone />
            </a>
        {/if}
        <slot name="phone" />
    </div>
    <div id="navigation-item-contact">
        {#if navigationActive}
            <a
                tabindex="-1"
                on:click|preventDefault={() => ($activeSection = SectionsSchema.enum.contact)}
                transition:fade
                href={"/contact"}>
                <span class="visually-hidden">contact</span>
                <Contact />
            </a>
        {/if}
        <slot name="contact" />
    </div>
</div>

<style>
    #navigation {
        display: grid;
        grid-template-areas:
            "coach settings computer"
            ". welcome ."
            "phone . contact";
        grid-template-columns: repeat(3, 100vw);
        grid-template-rows: repeat(3, 100vh);
        overflow: hidden;
        transition: all ease-in-out 0.5s;
        width: 300vw;
    }
    #navigation > div {
        position: relative;
    }
    #navigation > div > a {
        inset: 0;
        max-width: none;
        max-width: none;
        position: absolute;
        z-index: 9999;
    }
    #navigation > div > a,
    #navigation > div:nth-of-type(6) {
        align-items: center;
        backdrop-filter: blur(4px) saturate(90%);
        display: flex;
        place-content: center;
        padding: 1em;
    }
    :global(#navigation > div > a > svg) {
        height: 75%;
        width: 75%;
    }
    :global(#navigation > svg) {
        height: 75%;
        inset: 0;
        position: absolute;
        width: 75%;
    }
    :global(#navigation > svg:nth-of-type(1)) {
        filter: blur(15vh);
    }
    #navigation-item-phone {
        grid-area: phone;
    }
    #navigation-item-computer {
        grid-area: computer;
    }
    #navigation-item-welcome {
        grid-area: welcome;
    }
    #navigation-item-coach {
        grid-area: coach;
    }
    #navigation-item-contact {
        grid-area: contact;
    }
    #navigation[data-active-section="phone"],
    #navigation[data-active-section="computer"],
    #navigation[data-active-section="welcome"],
    #navigation[data-active-section="coach"],
    #navigation[data-active-section="contact"] {
        scale: 1;
    }
    #navigation[data-active-section="phone"] {
        translate: 100vw -200vh;
    }
    #navigation[data-active-section="computer"] {
        translate: -100vw;
    }
    #navigation[data-active-section="welcome"] {
        translate: 0 -100vh;
    }
    #navigation[data-active-section="coach"] {
        translate: 100vw 0;
    }
    #navigation[data-active-section="contact"] {
        translate: -100vw -200vh;
    }
    #navigation[data-active-section="none"] {
        scale: 0.3;
        translate: 0 -100vh;
    }
    :global([data-dark-mode="false"] #navigation-item-settings) {
        background-color: var(--white-50-percent);
    }
</style>
