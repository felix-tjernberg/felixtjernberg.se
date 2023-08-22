<script lang="ts">
    import BlogText from "$assets/svgs/BlogText.svelte"
    import ComputerText from "$assets/svgs/ComputerText.svelte"
    import CoachText from "$assets/svgs/CoachText.svelte"
    import ContactText from "$assets/svgs/ContactText.svelte"
    import Logo from "$assets/svgs/Logo.svelte"
    import PhoneText from "$assets/svgs/PhoneText.svelte"

    import NavigationLink from "./NavigationLink.svelte"

    import { navigationState, NavigationSchema } from "$stores/states/navigation"

    export let navigationActive: boolean = true

    $navigationState === NavigationSchema.enum.navigation ? (navigationActive = true) : (navigationActive = false)
    $: $navigationState === NavigationSchema.enum.navigation ? (navigationActive = true) : (navigationActive = false)
</script>

<div
    class="grid-stack height-100percent"
    data-testid="navigation-wrapper"
    id="navigation"
    data-navigation-state={$navigationState}>
    {#if navigationActive}
        <Logo />
        <Logo />
    {/if}
    <div class="navigation-item height-100percent relative" id="navigation-item-computer">
        <slot name="computer" />
        <NavigationLink {navigationActive} navigationStateName={NavigationSchema.enum.computer}>
            <ComputerText slot="textSVG" />
        </NavigationLink>
    </div>
    <div class="navigation-item height-100percent relative" id="navigation-item-coach">
        <slot name="coach" />
        <NavigationLink {navigationActive} navigationStateName={NavigationSchema.enum.coach}>
            <CoachText slot="textSVG" />
        </NavigationLink>
    </div>
    <div class="navigation-item height-100percent relative" id="navigation-item-phone">
        <slot name="phone" />
        <NavigationLink {navigationActive} navigationStateName={NavigationSchema.enum.phone}>
            <PhoneText slot="textSVG" />
        </NavigationLink>
    </div>
    <div class="navigation-item height-100percent relative" id="navigation-item-contact">
        <slot name="contact" />
        <NavigationLink {navigationActive} navigationStateName={NavigationSchema.enum.contact}>
            <ContactText slot="textSVG" />
        </NavigationLink>
    </div>
    <div class="navigation-item height-100percent relative" id="navigation-item-blog">
        <slot name="blog" />
        <NavigationLink {navigationActive} navigationStateName={NavigationSchema.enum.blog}>
            <BlogText slot="textSVG" />
        </NavigationLink>
    </div>
</div>

<style>
    #navigation {
        transition: all ease-in-out 0.5s;
    }
    #navigation > div {
        max-height: 100vh;
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
    .navigation-item > :global(*:focus-within + .navigation-link),
    #navigation:focus-within > :global(svg) {
        display: none;
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
    #navigation[data-navigation-state="phone"],
    #navigation[data-navigation-state="computer"],
    #navigation[data-navigation-state="blog"],
    #navigation[data-navigation-state="coach"],
    #navigation[data-navigation-state="contact"] {
        scale: 1;
    }
    #navigation[data-navigation-state="computer"] {
        translate: 0 0;
    }
    #navigation[data-navigation-state="coach"] {
        translate: 100% 100%;
    }
    #navigation[data-navigation-state="blog"] {
        translate: -100% 100%;
    }
    #navigation[data-navigation-state="phone"] {
        translate: 100% -100%;
    }
    #navigation[data-navigation-state="contact"] {
        translate: -100% -100%;
    }
    #navigation:has(#blog-section:focus-within),
    #navigation:has(#computer-section:focus-within),
    #navigation:has(#contact-section:focus-within),
    #navigation:has(#phone-section:focus-within),
    #navigation:has(#coach-section:focus-within) {
        scale: 1;
    }
    #navigation:has(#computer-section:focus-within) {
        translate: 0 0;
    }
    #navigation:has(#coach-section:focus-within) {
        translate: 100% 100%;
    }
    #navigation:has(#blog-section:focus-within) {
        translate: -100% 100%;
    }
    #navigation:has(#phone-section:focus-within) {
        translate: 100% -100%;
    }
    #navigation:has(#contact-section:focus-within) {
        translate: -100% -100%;
    }
    #navigation[data-navigation-state="navigation"] {
        scale: 0.3;
    }
</style>
