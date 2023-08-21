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
    <h2 class="font-family-3d">Settings</h2>
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
    <h2 class="font-family-3d">Attributions</h2>
    <div>
        <h3 class="font-family-primary-fat font-size-100">Phone vibration sound</h3>
        <a href="https://pixabay.com/sound-effects/smartphone-vibrating-alarm-silent-7040/">Link to sound</a>
        <p>
            Thanks to <a href="https://pixabay.com">pixabay</a> for the phone vibration sound <br />
            This audio is licensed under their
            <a href="https://pixabay.com/service/license-summary/">Content License</a>
        </p>
    </div>
    <div>
        <h3 class="font-family-primary-fat font-size-100">Nokia 3310 image</h3>
        <a href="https://commons.wikimedia.org/wiki/File:Nokia_3310_Blue_R7309170_(retouch).png">Link to image</a>
        <p>
            Thanks to <a href="https://commons.wikimedia.org/wiki/User:Multicherry">Multicherry</a> for uploading a
            retouched image of a nokia 3310 phone released 2000 <br />
            taken by Rainer Knäpper to wikimedia <br />
            This image is licensed under <a href="http://artlibre.org/licence/lal/en/">Fine Art License</a>
        </p>
    </div>
    <div>
        <h3 class="font-family-primary-fat font-size-100">Elevator music</h3>
        <a href="https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1300010">Link to sound</a>
        <p>
            Local Forecast - Elevator <br />Kevin MacLeod (incompetech.com)<br />
            Licensed under Creative Commons: By Attribution 3.0
            <a href="https://creativecommons.org/licenses/by/3.0/"> https://creativecommons.org/licenses/by/3.0/ </a>
        </p>
    </div>
</Overlay>
