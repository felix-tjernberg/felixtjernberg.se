<script lang="ts">
    import { fade } from "svelte/transition"
    import { activeSection, SectionsSchema } from "$stores/states/activeSection"
    import Blog from "$assets/svgs/Welcome.svelte"
    import Phone from "$assets/svgs/Phone.svelte"
    import Computer from "$assets/svgs/Computer.svelte"
    import Coach from "$assets/svgs/Coach.svelte"
    import Contact from "$assets/svgs/Contact.svelte"
    import Logo from "$assets/svgs/Logo.svelte"

    export let navigationActive: boolean = true

    $: $activeSection === SectionsSchema.enum.navigation ? (navigationActive = true) : (navigationActive = false)
</script>

<div class="grid-stack" data-testid="navigation-wrapper" id="navigation" data-active-section={$activeSection}>
    {#if navigationActive}
        <Logo />
        <Logo />
    {/if}
    <div id="navigation-item-coach">
        {#if navigationActive}
            <a on:click={() => ($activeSection = SectionsSchema.enum.coach)} transition:fade href={"/coach"}>
                <span class="visually-hidden">coach</span>
                <Coach />
            </a>
        {/if}
        <slot name="coach" />
    </div>
    <div id="navigation-item-blog">
        {#if navigationActive}
            <a
                tabindex="-1"
                on:click={() => ($activeSection = SectionsSchema.enum.blog)}
                transition:fade
                href={"/blog"}>
                <span class="visually-hidden">blog</span>
                <Blog />
            </a>
        {/if}
        <slot name="blog" />
    </div>
    <div id="navigation-item-computer">
        {#if navigationActive}
            <a
                tabindex="-1"
                on:click={() => ($activeSection = SectionsSchema.enum.computer)}
                transition:fade
                href={"/computer"}>
                <span class="visually-hidden">computer</span>
                <Computer />
            </a>
        {/if}
        <slot name="computer" />
    </div>
    <div id="navigation-item-phone">
        {#if navigationActive}
            <a
                tabindex="-1"
                on:click={() => ($activeSection = SectionsSchema.enum.phone)}
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
                on:click={() => ($activeSection = SectionsSchema.enum.contact)}
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
        height: 100%;
        transition: all ease-in-out 0.5s;
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
        height: 175%;
        inset: 0;
        position: absolute;
        width: 175%;
        translate: -25%;
    }
    :global(#navigation > svg:nth-of-type(1)) {
        filter: blur(15vh);
    }
    #navigation-item-coach {
        translate: -100% -100%;
    }
    #navigation-item-blog {
        translate: -100% -100%;
    }
    #navigation-item-blog {
        translate: 100% -100%;
    }
    #navigation-item-phone {
        translate: -100% 100%;
    }
    #navigation-item-contact {
        translate: 100% 100%;
    }
    #navigation[data-active-section="phone"],
    #navigation[data-active-section="computer"],
    #navigation[data-active-section="blog"],
    #navigation[data-active-section="coach"],
    #navigation[data-active-section="contact"] {
        scale: 1;
    }
    #navigation[data-active-section="coach"] {
        translate: 100% 100%;
    }
    #navigation[data-active-section="blog"] {
        translate: -100% 100%;
    }
    #navigation[data-active-section="phone"] {
        translate: 100% -100%;
    }
    #navigation[data-active-section="contact"] {
        translate: -100% -100%;
    }
    #navigation[data-active-section="navigation"] {
        scale: 0.3;
    }
    :global([data-dark-mode="false"] #navigation-item-settings) {
        background-color: var(--white-50-percent);
    }
</style>
