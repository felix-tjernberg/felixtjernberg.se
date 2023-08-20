<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import StickyNote from "$components/StickyNote/StickyNote.svelte"
    let notesActive = [true, true, true, true, true, true, true, true, true, true]
    let showResetNotesButton: boolean = false
</script>

<div id="sticky-note-wrapper" class="relative">
    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as _, index}
        <StickyNote active={notesActive[index]} flyToRight={index % 2 === 0} />
    {/each}
    {#if showResetNotesButton}
        <Button
            label="reset notes"
            on:click={() => {
                notesActive.forEach(() => (notesActive = notesActive.fill(true)))
                showResetNotesButton = false
            }} />
    {/if}
</div>

<style>
    #sticky-note-wrapper {
        top: 50%;
        left: 50%;
        translate: -50%;
        max-width: 200px;
        width: 100%;
        aspect-ratio: 1/1;
        z-index: 1337;
    }
    @media (max-height: 400px) {
        #sticky-note-wrapper {
            top: 60%;
        }
    }
</style>
