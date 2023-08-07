<script lang="ts">
    import BaseSettings from "$compositions/BaseSettings/BaseSettings.svelte"
    import Button from "$components/Button/Button.svelte"
    import Close from "$assets/svgs/Close.svelte"
    import SettingsText from "$assets/svgs/SettingsText.svelte"

    import { fade } from "svelte/transition"
    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { computerScreenIndex } from "$stores/states/computer"
    import { scavengerHuntDone } from "$stores/states/scavengerHuntDone"

    export let dialog: HTMLDialogElement
</script>

<dialog bind:this={dialog} id="settings-dialog" class="background-blur" data-testid="settings-dialog">
    <h2>
        <SettingsText />
        <span class="visually-hidden">settings</span>
    </h2>
    <div id="settings-box" class="flex-center background-blur margin-vertical-flow">
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
    </div>
    <Button id="close-settings" label="close settings" on:click={() => dialog.close()} testid="close-settings">
        <Close slot="icon" />
    </Button>
</dialog>

<style>
    :global(#settings-dialog .icon) {
        font-size: var(--relative-scale-300);
    }
    #settings-dialog {
        background-color: transparent;
        background-image: var(--gradient-90-percent);
        grid-template-rows: 33% 1fr;
        max-height: 100%;
        max-width: 100%;
        overflow: hidden;
    }
    #settings-dialog[open] {
        display: grid;
    }
    #settings-dialog > h2 {
        height: 100%;
        translate: 0 25%;
        width: 100%;
    }
    :global(#settings-dialog h2 > svg) {
        height: 100%;
        width: 75%;
    }
    :global(#settings-dialog button) {
        margin-top: 12px;
    }
    #settings-dialog,
    #settings-box {
        --background-blur-amount: 7px;
    }
    #settings-box {
        border: var(--stroke-300) solid var(--gray-100);
        flex-wrap: wrap;
        gap: var(--static-scale-400);
        margin: 3% 10% 10% 10%;
        overflow-x: hidden;
        overflow-y: auto;
        padding: var(--static-scale-300);
    }
    #settings-box > div {
        flex-basis: content;
        min-width: 300px;
    }
    :global([data-dark-mode="false"] #settings-box) {
        background-color: var(--white-50-percent);
    }
    :global(#close-settings) {
        position: absolute;
        top: 1em;
        right: 1em;
        font-size: var(--static-scale-400);
        margin-top: 0 !important;
    }
    :global(#dark-mode button) {
        font-size: var(--static-scale-300);
    }
    :global(#dark-mode button path) {
        stroke-width: 2px !important;
    }
    @media (max-width: 720px) {
        #settings-dialog {
            grid-template-rows: 20% 1fr;
        }
        #settings-box {
            margin: 0;
            padding: 1em;
        }
        :global(#close-settings > button) {
            margin-right: 0;
            margin-top: 0;
        }
    }
</style>
