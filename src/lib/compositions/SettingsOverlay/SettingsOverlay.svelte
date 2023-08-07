<script lang="ts">
    import BaseSettings from "$compositions/BaseSettings/BaseSettings.svelte"
    import Button from "$components/Button/Button.svelte"
    import SettingsText from "$assets/svgs/SettingsText.svelte"
    import Overlay from "$components/Overlay/Overlay.svelte"

    import { fade } from "svelte/transition"

    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { computerScreenIndex } from "$stores/states/computer"
    import { settingsOpen } from "$stores/states/settingsOpen"
    import { scavengerHuntDone } from "$stores/states/scavengerHuntDone"
</script>

<Overlay headerText="settings" bind:open={$settingsOpen}>
    <SettingsText slot="headerTextSVG" />
    <BaseSettings />
    <div class="flex-column-center">
        {#if $cookiesAllowed}
            <h3>Changed your mind about cookies?</h3>
            <form action="?/removeCookies" method="POST">
                <Button label="Yes delete cookies!" testid="cookies-allowed-false" />
            </form>
        {:else}
            <h3>Changed your mind about cookies?</h3>
            <form action="?/allowCookies" method="POST">
                <Button label="Yes allow essential cookies" testid="cookies-allowed-true" />
            </form>
        {/if}
    </div>
    {#if $scavengerHuntDone}
        <div class="flex-column-center" transition:fade={{ duration: 1337 }}>
            <h3>Want to do the scavenger hunt again?</h3>
            <Button
                label="yes restart scavenger hunt!"
                on:click={() => {
                    $scavengerHuntDone = false
                    $computerScreenIndex = 0
                }}
                testid="reset-scavenger-hunt" />
        </div>
    {/if}
</Overlay>
