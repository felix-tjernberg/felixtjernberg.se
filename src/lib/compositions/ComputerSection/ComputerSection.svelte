<script lang="ts">
    import FirstScreen from "./FirstScreen.svelte"
    import SecondScreen from "./SecondScreen.svelte"
    import ThirdScreen from "./ThirdScreen.svelte"
    import FourthScreen from "./FourthScreen.svelte"
    import FifthScreen from "./FifthScreen.svelte"
    import FirstScreenStickyNotes from "./FirstScreenStickyNotes.svelte"
    import Notification from "$components/Notification/Notification.svelte"

    const SCREENS = [FirstScreen, SecondScreen, ThirdScreen, FourthScreen, FifthScreen]
    let screenIndex = 4

    let clueNotificationActive: boolean
</script>

<section id="computer-section" class="flex-column-center relative">
    <h2 class="visually-hidden absolute">computer</h2>
    {#if screenIndex === 0}
        <Notification bind:active={clueNotificationActive}>
            <p>
                PIN CODE:<br />
                Is the sum of the 4 numbers in the corners
            </p>
        </Notification>
    {/if}
    <div id="computer" class="flex-column-center relative">
        <svelte:component this={SCREENS[screenIndex]} bind:screenIndex />
        <div id="computer-crt-effect" class="absolute" />
        {#if screenIndex === 0}
            <FirstScreenStickyNotes bind:clueNotificationActive />
        {/if}
    </div>
</section>

<style>
    #computer-section {
        height: 100%;
        width: 100%;
    }
    #computer {
        width: 500px;
        aspect-ratio: 1 / 1;
    }
    :global(#computer > :nth-child(1)) {
        z-index: 1;
    }
    #computer-crt-effect {
        inset: 0;
        overflow: hidden;
        background: radial-gradient(transparent, black), green;
    }
    #computer-crt-effect::before {
        content: " ";
        display: block;
        position: absolute;
        inset: 0;
        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
            linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
        background-size: 100% 6.66px, 6.66px 100%;
        pointer-events: none;
        z-index: 1;
    }
    #computer-crt-effect::before,
    #computer-crt-effect::after {
        pointer-events: none;
    }
    #computer-crt-effect::after {
        animation: scan-line 5s linear infinite;
        content: "";
        display: block;
        width: 100%;
        height: 50px;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.2) 10%, rgba(0, 0, 0, 0.1) 100%);
        position: absolute;
        bottom: 100%;
        z-index: 2;
    }
    @keyframes scan-line {
        0% {
            bottom: 100%;
        }
        100% {
            opacity: 0.1;
            bottom: -50px;
        }
    }
</style>
