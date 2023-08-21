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
        margin-top: var(--static-scale-300);
        height: min(calc(100% - var(--static-scale-300)), 500px);
        width: min(100%, 500px);
    }
    @media (min-height: 500px) {
        #computer {
            height: min(100%, 500px);
            margin-top: auto;
        }
    }
</style>
