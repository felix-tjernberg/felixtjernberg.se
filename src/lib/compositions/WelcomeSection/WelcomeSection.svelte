<script lang="ts">
    import { firstVisit, firstVisitNotification } from "$stores/firstVisitStore"

    import Notification from "$components/Notification/Notification.svelte"

    import Logo from "$assets/svgs/Logo.svelte"
    import WelcomeSectionText from "$assets/svgs/WelcomeSectionText.svelte"
</script>

{#if JSON.parse($firstVisitNotification)}
    <Notification active={JSON.parse($firstVisitNotification)}>
        <p class="font-size-200">
            If you change your mind about any settings click the cogwheel icon in the top right of the screen
        </p>
        <p class="font-size-100">(Click this notification to close it)</p>
    </Notification>
{/if}
<section id="welcome-section">
    <Logo />
    <h1><WelcomeSectionText /><span class="visually-hidden">Welcome!</span></h1>
    <div class="flex-column-center gap">
        <p id="welcome-paragraph" data-testid="welcome-paragraph">
            <span data-testid="first-sentence">
                To my spot on the interwebs! <br />Click the button in the top left to navigate
            </span>
            <br />
            {#if JSON.parse($firstVisit)}
                <span data-testid="recommendation">(I recommend checking out my computer first)</span>
            {/if}
        </p>
    </div>
</section>

<style>
    p {
        max-width: 100%;
        padding-left: 1em;
        padding-right: 1em;
    }
    p > span {
        color: transparent;
        background: var(--gradient);
        background-clip: text;
        -webkit-background-clip: text;
    }
    p > span:nth-of-type(1) {
        font-size: var(--static-scale-200);
    }
    p > span:nth-of-type(2) {
        font-size: var(--static-scale-100);
    }
    #welcome-section {
        display: grid;
        grid-template-rows: 1fr 1fr;
        height: 100%;
        overflow-y: auto;
        place-items: center;
        padding-top: 5em;
        padding-bottom: 4em;
    }
    #welcome-section > h1 {
        align-self: end;
    }
    #welcome-section > div {
        margin-top: 1em;
        align-self: start;
        z-index: 1;
    }
    #welcome-paragraph {
        background-image: radial-gradient(circle at 50% 50%, #000000ff 0%, #00000000 100%);
        padding: 1em;
    }
    :global(#welcome-section > svg) {
        filter: blur(10px);
        opacity: 0.3;
        height: 90%;
        inset: 0;
        position: absolute;
        width: 90%;
    }
    :global(#welcome-section > h1 > svg) {
        display: flex;
        max-width: 50ch !important;
        max-height: 100% !important;
        height: 100%;
        width: 100%;
        filter: drop-shadow(0px 10px 10px rgb(0 0 0));
    }
</style>
