<script lang="ts">
    import { activeSection } from "$stores/activeSectionStore"
    import { firstVisit, firstVisitNotification } from "$stores/firstVisitStore"
    import { SectionsSchema } from "$compositions/NavigationWrapper/NavigationSectionsSchema"

    import Button from "$components/Button/Button.svelte"
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
        <p data-testid="welcome-paragraph">
            <span data-testid="first-sentence">
                What do you want to check out {JSON.parse($firstVisit) ? "first" : "now"}?<br />
            </span>
            {#if JSON.parse($firstVisit)}
                <span data-testid="recommendation">(I recommend checking out my computer first)</span>
            {/if}
        </p>
        <div class="flex-wrap-center gap">
            {#each ["computer", "coach", "contact", "phone"] as section}
                <Button
                    style="--background-blur-amount: 2px"
                    label={section}
                    href={`/${section}`}
                    on:click={(event) => {
                        event.preventDefault()
                        $activeSection = SectionsSchema.parse(section)
                        $firstVisit = false
                    }} />
            {/each}
        </div>
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
    p > span:nth-child(1) {
        font-size: var(--static-scale-200);
    }
    p > span:nth-child(2) {
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
