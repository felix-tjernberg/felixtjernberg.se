<script lang="ts">
    import CrtOverlay from "./CRTOverlay.svelte"
</script>

<div id="computer" class="relative margin-auto grid-stack">
    <slot name="stickyNotes" />
    <CrtOverlay>
        <slot name="screen" />
    </CrtOverlay>
</div>

<style>
    #computer {
        height: min(100%, 500px);
        width: min(100%, 500px);
    }
</style>
