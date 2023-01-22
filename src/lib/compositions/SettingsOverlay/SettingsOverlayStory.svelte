<script lang="ts">
    import SettingsOverlay from "./SettingsOverlay.svelte"
    // import { audioVolume } from "$utilities/stores/audioVolumeStore"
    import { cookiesAllowed } from "$utilities/stores/cookiesAllowedStore"
    import { darkMode } from "$utilities/stores/darkModeStore"
    import { likesEightBitFont } from "$utilities/stores/likesEightBitFontStore"
    import { scavengerHuntDone } from "$utilities/stores/scavengerHuntDoneStore"

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
