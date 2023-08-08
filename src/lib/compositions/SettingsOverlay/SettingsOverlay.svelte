<script lang="ts">
    import BaseSettings from "$compositions/BaseSettings/BaseSettings.svelte"
    import Button from "$components/Button/Button.svelte"
    import Description from "$components/Description.svelte"
    import SettingsText from "$assets/svgs/SettingsText.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"
    import Overlay from "$components/Overlay/Overlay.svelte"

    import { fade } from "svelte/transition"
    import { enhance } from "$app/forms"

    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { settingsOpen } from "$stores/states/settingsOpen"
    import { scavengerHuntDone, scavengerHuntDoneKey } from "$stores/states/scavengerHuntDone"
    import { booleanNameKey, valueKey } from "$utilities/toggleBooleanKeys"
    import { setJSCookie } from "$utilities/setJSCookie"
</script>

<Overlay headerText="settings" bind:open={$settingsOpen}>
    <SettingsText slot="headerTextSVG" />
    <BaseSettings />
    <div class="flex-column-center">
        <Description
            description="Changed your mind about cookies?"
            noScriptDescription="Changed your mind about cookies?">
            {#if $cookiesAllowed}
                <form action="?/removeCookies" method="POST">
                    <Button label="Yes delete cookies!" testid="cookies-allowed-false" />
                </form>
            {:else}
                <form action="?/allowCookies" method="POST">
                    <Button label="Yes allow essential cookies" testid="cookies-allowed-true" />
                </form>
            {/if}
        </Description>
    </div>
    {#if $scavengerHuntDone}
        <div class="flex-column-center" transition:fade={{ duration: 1337 }}>
            <Description description="Want to do the scavenger hunt again?">
                {#if $cookiesAllowed}
                    <form
                        action="?/toggleBoolean"
                        method="POST"
                        use:enhance={() => {
                            $scavengerHuntDone = false
                            if ($cookiesAllowed) setJSCookie(scavengerHuntDoneKey, "false")
                        }}>
                        <input type="hidden" name={booleanNameKey} value={scavengerHuntDoneKey} />
                        <Button
                            label="yes restart scavenger hunt!"
                            name={valueKey}
                            value="false"
                            testid="reset-scavenger-hunt" />
                        <Button label="yes restart scavenger hunt!" testid="reset-scavenger-hunt" />
                    </form>
                {:else}
                    <form on:submit={() => ($scavengerHuntDone = false)}>
                        <HiddenInputs excludeStates={[scavengerHuntDoneKey]} />
                        <Button
                            label="yes restart scavenger hunt!"
                            testid="reset-scavenger-hunt"
                            name={scavengerHuntDoneKey}
                            value="false" />
                    </form>
                {/if}
            </Description>
        </div>
    {/if}
</Overlay>
