<script lang="ts">
    import SettingsOverlay from "./SettingsOverlay.svelte"
    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { darkMode } from "$stores/settings/darkMode"
    import { likesEightBitFont } from "$stores/settings/likesEightBitFont"
    import { scavengerHuntState } from "$stores/states/scavengerHuntState"
    import { onMount } from "svelte"

    let dialog: HTMLDialogElement

    $scavengerHuntState = true
    $cookiesAllowed = true
    $darkMode = true
    $likesEightBitFont = true

    onMount(() => {
        dialog.showModal()
    })
</script>

<div>
    <button on:click={() => dialog.showModal()}>open settings</button>
    <SettingsOverlay bind:dialog />
    <p class="visually-hidden" data-testid="cookies-allowed-indicator">{$cookiesAllowed}</p>
    <p class="visually-hidden" data-testid="dark-mode-indicator">{$darkMode}</p>
    <p class="visually-hidden" data-testid="likes-eight-bit-font-indicator">{$likesEightBitFont}</p>
    <p class="visually-hidden" data-testid="scavenger-hunt-done-indicator">{$scavengerHuntState}</p>
    <!-- <p class="visually-hidden" data-testid="volume-indicator">{$audioVolume}</p> -->
</div>

<style>
    div {
        height: 420px;
        width: 100vw;
    }
</style>
