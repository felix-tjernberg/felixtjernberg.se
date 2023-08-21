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
    import {
        S1DefaultState,
        scavengerHuntState,
        scavengerHuntStateKey,
        updateScavengerHuntStateKey,
    } from "$stores/states/scavengerHuntState"
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
    {#if $scavengerHuntState[0] === "7"}
        <div class="flex-column-center" transition:fade={{ duration: 1337 }}>
            <Description description="Want to do the scavenger hunt again?">
                {#if $cookiesAllowed}
                    <form
                        action={`?/${updateScavengerHuntStateKey}`}
                        method="POST"
                        use:enhance={() => {
                            $scavengerHuntState = S1DefaultState
                            if ($cookiesAllowed) setJSCookie(scavengerHuntStateKey, S1DefaultState)
                        }}>
                        <Button
                            label="yes restart scavenger hunt!"
                            name={scavengerHuntStateKey}
                            value={S1DefaultState} />
                    </form>
                {:else}
                    <form on:submit={() => ($scavengerHuntState = S1DefaultState)}>
                        <HiddenInputs excludeStates={[scavengerHuntStateKey]} />
                        <Button
                            label="yes restart scavenger hunt!"
                            name={scavengerHuntStateKey}
                            value={S1DefaultState} />
                    </form>
                {/if}
            </Description>
        </div>
    {/if}
</Overlay>
