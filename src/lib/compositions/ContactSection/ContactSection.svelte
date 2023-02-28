<script lang="ts">
    import { activeSection } from "$stores/activeSectionStore"
    import { SectionsSchema } from "$compositions/NavigationWrapper/NavigationSectionsSchema"
    import { scavengerHuntDone } from "$stores/scavengerHuntDoneStore"

    import LinkedIn from "$assets/svgs/LinkedIn.svelte"
    import GitHub from "$assets/svgs/GitHub.svelte"

    export let data: {
        email: string
        phoneNumber: string
    }
</script>

<section id="contact-section">
    <div id="links-wrapper" class="glow">
        <a tabindex="-1" class="flex-column-center" href="https://www.linkedin.com/in/felix-tjernberg">
            <span class="visually-hidden">Go to Felix Tjernbergs LinkedIn profile</span>
            <LinkedIn />
            <span>LinkedIn</span>
        </a>
        <a tabindex="-1" class="flex-column-center" href="https://github.com/felix-tjernberg">
            <span class="visually-hidden">Go to Felix Tjernbergs GitHub profile</span>
            <GitHub />
            <span>GitHub</span>
        </a>
    </div>
    <div class="border background-blur margin-vertical-flow glow flex-column-center" id="text-wrapper">
        <h2>You can reach me best <br /> with a <br /> text, call or email</h2>
        {#if JSON.parse($scavengerHuntDone)}
            <p class="font-size-300" data-testid="email-and-phone-paragraph">
                Email Adress: {data.email} <br />
                Phone Number: {data.phoneNumber}
            </p>
        {:else}
            <p class="font-size-300" data-testid="scavenger-hunt-paragraph">
                Take a well deserved 5 minute break and do my scavenger hunt to unlock my email and phone number
            </p>
            <a
                tabindex="-1"
                href="/coach"
                on:click|preventDefault={() => ($activeSection = SectionsSchema.enum.computer)}>
                Go to scavenger hunt
            </a>
        {/if}
    </div>
</section>

<style>
    #contact-section {
        display: grid;
        padding: var(--static-scale-400);
        height: 100%;
        overflow-y: auto;
        display: grid;
        place-items: center;
        padding-top: 5em;
        padding-bottom: 4em;
    }
    #links-wrapper {
        font-size: var(--static-scale-500);
        padding: var(--static-scale-300);
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--relative-scale-300);
        place-items: center end;
    }
    #links-wrapper a:nth-child(1) {
        justify-self: end;
    }
    #links-wrapper a:nth-child(2) {
        justify-self: start;
    }
    #links-wrapper span {
        font-size: var(--relative-scale-000);
    }
    :global([data-dark-mode="false"] #links-wrapper) {
        --glow-color: var(--white);
        --stroke-color: var(--white);
    }
    :global([data-dark-mode="false"] #links-wrapper a) {
        color: var(--white);
    }
    #text-wrapper {
        --background-blur-amount: 5px;
        --glow-color: var(--gray-100);
        --glow-size: 13.37px;
        --stroke-color: var(--gray-100);
        --stroke-width: var(--stroke-400);
        padding: var(--static-scale-300);
        font-size: var(--static-scale-200);
    }
    #text-wrapper h2 {
        font-family: var(--font-family-primary-fat);
        font-size: var(--static-scale-200);
        line-height: 1.5;
    }
    #text-wrapper a {
        font-size: var(--relative-scale-200);
    }
    @media (max-width: 720px) {
        #contact-section,
        #links-wrapper {
            display: flex;
            flex-direction: column;
            gap: 1em;
            padding-left: 0;
            padding-right: 0;
        }
        #text-wrapper h2 {
            font-size: var(--static-scale-100);
        }
        .font-size-300 {
            font-size: var(--static-scale-200);
        }
    }
</style>
