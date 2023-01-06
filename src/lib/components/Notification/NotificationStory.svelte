<script lang="ts">
    import Notification from "./Notification.svelte"

    export let active: boolean | undefined
    export let closeButton: boolean | undefined
</script>

<div data-testid="notification">
    <Notification {active} {closeButton} />
</div>
