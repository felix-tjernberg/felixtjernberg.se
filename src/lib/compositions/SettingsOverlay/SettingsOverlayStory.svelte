<script lang="ts">
    import SettingsOverlay from "./SettingsOverlay.svelte"
    // import { audioVolume } from "$stores/settings/audioVolume"
    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { darkMode } from "$stores/settings/darkMode"
    import { likesEightBitFont } from "$stores/settings/likesEightBitFontStore"
    import { scavengerHuntDone } from "$stores/states/scavengerHuntDone"

    let dialog: HTMLDialogElement

    $scavengerHuntDone = true
    $cookiesAllowed = true
    $darkMode = true
    $likesEightBitFont = true
    // $audioVolume = 0.5
</script>

<div>
    <button on:click={() => dialog.showModal()}>open settings</button>
    <SettingsOverlay bind:dialog />
    <p class="visually-hidden" data-testid="cookies-allowed-indicator">{$cookiesAllowed}</p>
    <p class="visually-hidden" data-testid="dark-mode-indicator">{$darkMode}</p>
    <p class="visually-hidden" data-testid="likes-eight-bit-font-indicator">{$likesEightBitFont}</p>
    <p class="visually-hidden" data-testid="scavenger-hunt-done-indicator">{$scavengerHuntDone}</p>
    <!-- <p class="visually-hidden" data-testid="volume-indicator">{$audioVolume}</p> -->
</div>

<style>
    div {
        height: 420px;
        width: 100vw;
    }
</style>
