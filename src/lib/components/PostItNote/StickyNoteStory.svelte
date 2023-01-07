<script lang="ts">
    import StickyNote from "./StickyNote.svelte"
    export let sampleText: string | undefined
</script>

<div data-testid="note">
    <StickyNote>
        <p>{sampleText}</p>
    </StickyNote>
</div>
