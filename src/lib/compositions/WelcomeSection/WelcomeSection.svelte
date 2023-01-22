<script lang="ts">
    import { activeSection } from "$stores/activeSectionStore"
    import { firstVisit } from "$stores/firstVisitStore"
    import { SectionsSchema } from "$compositions/NavigationWrapper/NavigationSectionsSchema"

    import Button from "$components/Button/Button.svelte"
    import Logo from "$assets/svgs/Logo.svelte"
    import WelcomeSectionText from "$assets/svgs/WelcomeSectionText.svelte"
</script>

<section id="welcome-section">
    <Logo />
    <h1><WelcomeSectionText /><span class="visually-hidden">Welcome!</span></h1>
    <div class="flex-column-center gap">
        <p data-testid="welcome-paragraph">
            <span data-testid="first-sentence">
                What do you want to check out {$firstVisit ? "first" : "now"}?<br />
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
    }
    p > span {
        color: transparent;
        background: var(--gradient);
        background-clip: text;
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
        width: 100%;
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
