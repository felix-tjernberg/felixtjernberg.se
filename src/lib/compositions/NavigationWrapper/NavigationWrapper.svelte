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

<div class="grid-stack" data-testid="navigation-wrapper" id="navigation" data-navigation-state={$navigationState}>
    {#if navigationActive}
        <Logo />
        <Logo />
    {/if}
    <div class="relative" id="navigation-item-computer">
        <NavigationLink {navigationActive} navigationStateName={NavigationSchema.enum.computer}>
            <ComputerText slot="textSVG" />
        </NavigationLink>
        <slot name="computer" />
    </div>
    <div class="relative" id="navigation-item-coach">
        <NavigationLink {navigationActive} navigationStateName={NavigationSchema.enum.coach}>
            <CoachText slot="textSVG" />
        </NavigationLink>
        <slot name="coach" />
    </div>
    <div class="relative" id="navigation-item-phone">
        <NavigationLink {navigationActive} navigationStateName={NavigationSchema.enum.phone}>
            <PhoneText slot="textSVG" />
        </NavigationLink>
        <slot name="phone" />
    </div>
    <div class="relative" id="navigation-item-contact">
        <NavigationLink {navigationActive} navigationStateName={NavigationSchema.enum.contact}>
            <ContactText slot="textSVG" />
        </NavigationLink>
        <slot name="contact" />
    </div>
    <div class="relative" id="navigation-item-blog">
        <NavigationLink {navigationActive} navigationStateName={NavigationSchema.enum.blog}>
            <BlogText slot="textSVG" />
        </NavigationLink>
        <slot name="blog" />
    </div>
</div>

<style>
    #navigation {
        height: 100%;
        transition: all ease-in-out 0.5s;
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
    #navigation[data-navigation-state="phone"],
    #navigation[data-navigation-state="computer"],
    #navigation[data-navigation-state="blog"],
    #navigation[data-navigation-state="coach"],
    #navigation[data-navigation-state="contact"] {
        scale: 1;
    }
    #navigation[data-navigation-state="navigation"] {
        scale: 0.3;
    }
</style>
