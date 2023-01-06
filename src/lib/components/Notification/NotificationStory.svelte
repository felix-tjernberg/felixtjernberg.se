<script lang="ts">
    import Notification from "./Notification.svelte"

    export let active: boolean | undefined
    export let closeButton: boolean | undefined

    // Testing property
    export let sampleText: string | undefined
</script>

<div data-testid="notification">
    <Notification {active} {closeButton}>
        {#if sampleText}
            <p>{sampleText}</p>
        {/if}
    </Notification>
</div>

<style>
    div {
        height: 420px;
        min-width: 100vw;
    }
</style>
