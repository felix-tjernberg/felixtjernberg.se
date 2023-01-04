<script lang="ts">
    import StarfieldBackground from "$components/StarfieldBackground.svelte"
</script>

<div>
    <StarfieldBackground />
    <slot />
</div>

<style>
    div {
        position: relative;
        display: inline-block;
    }
    :global(canvas) {
        top: 0;
        left: 0;
    }
</style>
