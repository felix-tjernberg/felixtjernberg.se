<script lang="ts">
    import SettingsOverlay from "./SettingsOverlay.svelte"
    let dialog: HTMLDialogElement
</script>

<div>
    <button on:click={() => dialog.showModal()}>open settings</button>
    <SettingsOverlay bind:dialog />
</div>

<style>
    div {
        height: 420px;
        width: 100vw;
    }
</style>
