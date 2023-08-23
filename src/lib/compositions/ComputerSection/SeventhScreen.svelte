<script lang="ts">
    import { navigationState, NavigationSchema } from "$stores/states/navigation"
</script>

<div id="seventh-screen" class="flex-column gap">
    <p class="font-family-3d margin-top-auto">Congratu<wbr />lations!</p>
    <p class="font-family-primary-fat font-size-000">
        phone number and email <br />
        is now unlocked in the
        <br />
        <a
            href="/contact"
            on:click|preventDefault={() => ($navigationState = NavigationSchema.enum.contact)}
            data-testid="contact-section-link">
            contact section
        </a>
    </p>
    <p class="margin-bottom-auto">here play with some sticky notes</p>
</div>

<style>
    #seventh-screen {
        height: 50%;
        max-height: calc(100vh - var(--static-scale-300));
        overflow-y: auto;
    }
</style>
