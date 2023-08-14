<script lang="ts">
    import rickRoll from "$assets/images/rick-roll.png"
    import StickyNote from "$components/StickyNote/StickyNote.svelte"
    import { booleanStateSchema, scavengerHuntState, type ScavengerHuntStates } from "$stores/states/scavengerHuntState"

    import { fade } from "svelte/transition"

    $: newStickyNoteOneState = ($scavengerHuntState.slice(0, 2) +
        booleanStateSchema.enum.F +
        $scavengerHuntState.slice(3)) as ScavengerHuntStates
    $: newStickyNoteTwoState = ($scavengerHuntState.slice(0, 3) +
        booleanStateSchema.enum.F +
        $scavengerHuntState.slice(4, $scavengerHuntState.length - 1) +
        booleanStateSchema.enum.T) as ScavengerHuntStates
    $: newStickyNoteThreeState = ($scavengerHuntState.slice(0, 4) +
        booleanStateSchema.enum.F +
        $scavengerHuntState.slice(5)) as ScavengerHuntStates
</script>

<div id="first-screen-notes" class="grid" transition:fade>
    <div id="first-screen-notes-top-right" class="flex-center relative">
        <StickyNote
            active={$scavengerHuntState[2] === booleanStateSchema.enum.T}
            newScavengerHuntState={newStickyNoteOneState}
            flyToRight={false}>
            <p>Press the notes to remove them</p>
        </StickyNote>
    </div>
    <div id="first-screen-notes-bottom-left" class="flex-center relative">
        <StickyNote
            active={$scavengerHuntState[3] === booleanStateSchema.enum.T}
            newScavengerHuntState={newStickyNoteTwoState}>
            <p class="font-size-000">
                PIN CODE:<br />
                sum of the 4 corner numbers
            </p>
        </StickyNote>
    </div>
    <div id="first-screen-notes-bottom-right" class="flex-center relative">
        <StickyNote
            active={$scavengerHuntState[4] === booleanStateSchema.enum.T}
            newScavengerHuntState={newStickyNoteThreeState}
            flyToRight={false}>
            <picture><img src={rickRoll} alt="a qr code" /></picture>
        </StickyNote>
    </div>
</div>

<style>
    #first-screen-notes {
        pointer-events: none;
        z-index: 1337;
        position: absolute;
        height: 100%;
        width: 100%;
        margin: auto;
        display: grid;
        grid-template-columns: 137px auto 137px;
        grid-template-rows: 137px auto 137px;
        grid-template-areas:
            "top-left . top-right"
            "content content content"
            "bottom-left . bottom-right";
    }
    #first-screen-notes-top-right,
    #first-screen-notes-bottom-left,
    #first-screen-notes-bottom-right {
        pointer-events: all;
    }
    #first-screen-notes-top-right {
        grid-area: top-right;
        rotate: 6.66deg;
        translate: -10px 30px;
    }
    #first-screen-notes-bottom-left {
        grid-area: bottom-left;
        rotate: 6.9deg;
        translate: 6.9px 13.37px;
    }
    #first-screen-notes-bottom-right {
        grid-area: bottom-right;
        rotate: -7.2deg;
        translate: -6.66px 13.37px;
    }
</style>
