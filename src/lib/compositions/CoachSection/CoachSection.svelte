<script lang="ts">
    import FootballPlays from "$assets/svgs/FootballPlays.svelte"
    import CoachImage from "$components/Coach/CoachImage.svelte"
</script>

<div id="coach-section-wrapper" class="relative">
    <FootballPlays />
    <div id="coach-section-box-wrapper" class="relative background-blur border glow">
        <CoachImage />
        <section id="coach-section">
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <h2 class="section-header" tabindex="0">Coach Section</h2>
            <h2 id="coach-header">Coaching american football for 3 years taught me a few valuable life lessons</h2>
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <div class="padding-horizontal" tabindex="0">
                <div id="statement-1">
                    <p class="clockwise-rotated-text">
                        <span class="bigger-text">Big Confidence</span> to lead when called upon
                    </p>
                </div>
                <div id="statement-2">
                    <p class="counter-clockwise-rotated-text">
                        To
                        <span class="counter-clockwise-rotated-text">bre</span><span class="clockwise-rotated-text"
                            >ak</span>
                        down movements into
                        <span class="smaller-text">smaller more coachable points</span>
                        <br />
                        which helps when
                        <span class="clockwise-rotated-text">brea</span><span class="counter-clockwise-rotated-text"
                            >king</span>
                        down programming tasks
                    </p>
                </div>
                <div id="statement-3">
                    <p class="counter-clockwise-rotated-text">
                        Being a <span class="perspective-text">leader</span> taught me to see others
                        <span class="perspective-text">perspective</span> more clearly
                    </p>
                </div>
                <div id="statement-4">
                    <p class="clockwise-rotated-text">
                        Following the team motto <br />
                        <em>Laget före Jaget </em><br />
                        <span class="smaller-text">which is directly translated to: </span><br />
                        <em>Team before Me </em><br />
                        makes everyone a better teammate
                    </p>
                </div>
            </div>
        </section>
    </div>
</div>

<style>
    #coach-section-wrapper {
        display: grid;
        height: 100%;
        place-content: center;
        overflow: hidden;
    }
    :global(#coach-section-wrapper > svg) {
        height: 175%;
        left: 50%;
        opacity: 50%;
        position: absolute;
        top: 50%;
        translate: -50% -50%;
        width: 175%;
    }
    #coach-section-box-wrapper {
        --background-blur-amount: 5px;
        --glow-color: var(--gray-100);
        --glow-size: 13.37px;
        --stroke-color: var(--gray-100);
        --stroke-width: var(--stroke-400);
        overflow: hidden;
    }
    #coach-section {
        display: grid;
        gap: var(--static-scale-500);
        height: 100%;
        margin: auto;
        padding: var(--static-scale-400);
        place-items: center;
    }
    #coach-section > div {
        --padding-amount: 0.25em;
        -ms-overflow-style: none;
        display: grid;
        gap: var(--static-scale-300);
        grid-template-areas:
            "statement-one . statement-three"
            "statement-two . statement-four";
        grid-template-columns: 1fr 1fr 1fr;
        height: 100%;
        overflow-y: auto;
        scrollbar-width: none;
        width: 100%;
    }
    #coach-section > div::-webkit-scrollbar {
        display: none;
    }
    #coach-section p {
        max-width: 35ch;
    }
    :global(#coach-section-box-wrapper > picture) {
        margin-bottom: 0;
        z-index: -1;
    }
    #coach-header {
        padding-top: 2em;
        font-family: var(--font-family-primary-fat);
        font-size: var(--relative-scale-200);
        max-width: 38ch;
    }
    #statement-1 {
        grid-area: statement-one;
    }
    #statement-2 {
        grid-area: statement-two;
    }
    #statement-3 {
        grid-area: statement-three;
    }
    #statement-4 {
        grid-area: statement-four;
    }
    .clockwise-rotated-text,
    .counter-clockwise-rotated-text,
    .perspective-text {
        font-size: 1.2em;
    }
    .clockwise-rotated-text {
        display: inline-block;
        transform: rotate(4deg);
    }
    .counter-clockwise-rotated-text {
        display: inline-block;
        transform: rotate(-7deg);
    }
    .bigger-text {
        font-size: 2em;
    }
    .smaller-text {
        font-size: 0.666em;
    }
    .perspective-text {
        --face-color: var(--gray-900);
        --side-color: var(--gray-200);
        color: var(--face-color);
        display: inline-block;
        transform: skew(15deg) rotate3d(10, 0, -1, 30deg);
        text-shadow: 0 0.5px 0 var(--side-color), 0 1px 0 var(--side-color), 0 1.5px 0 var(--side-color),
            0 2px 0 var(--side-color), 0 2.5px 0 var(--side-color), 0 3px 0 var(--side-color),
            0 3.5px 0 var(--side-color), 0 4px 0 var(--side-color);
    }
    :global([data-dark-mode="false"] .perspective-text) {
        --side-color: var(--gray-600) !important;
    }
    @media (max-width: 1100px) {
        #coach-section > div {
            display: flex;
            background-color: var(--gray-000-50-percent);
            padding: var(--static-scale-300);
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
        }
        #statement-1 {
            order: 1;
        }
        #statement-2 {
            order: 3;
        }
        #statement-3 {
            order: 2;
        }
        #statement-4 {
            order: 4;
        }
    }
    @media (max-width: 500px) {
        #coach-section-wrapper {
            font-size: var(--static-scale-000);
        }
    }
    @media (max-width: 500px) {
        #coach-section {
            padding: 0;
        }
        #coach-section > h2 {
            padding-top: 8em;
        }
    }
    @media (max-height: 500px) {
        #coach-section-box-wrapper {
            font-size: var(--static-scale-000);
            overflow-y: auto;
        }
        #coach-section > div {
            overflow: visible;
        }
        :global(#coach-section-box-wrapper > picture) {
            display: none;
        }
    }
</style>
