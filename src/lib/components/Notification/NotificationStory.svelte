<script lang="ts">
    import CloseableNotification from "./CloseableNotification.svelte"

    export let active: boolean | undefined

    // Testing property
    export let sampleText: string | undefined
</script>

<div data-testid="notification">
    <CloseableNotification {active}>
        {#if sampleText}
            <p>{sampleText}</p>
        {/if}
    </CloseableNotification>
</div>

<style>
    div {
        height: 420px;
        min-width: 50vw;
    }
</style>
