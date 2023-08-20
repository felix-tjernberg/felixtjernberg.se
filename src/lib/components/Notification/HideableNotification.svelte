<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"
    import Notification from "$assets/svgs/Notification.svelte"

    import { enhance } from "$app/forms"
    import { fade } from "svelte/transition"

    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import {
        type ScavengerHuntStates,
        scavengerHuntState,
        scavengerHuntStateKey,
        T,
        F,
    } from "$stores/states/scavengerHuntState"
    import { setJSCookie } from "$utilities/setJSCookie"

    export let state: string
    export let stateIndex: number

    let shown: boolean = state === T

    $: newTrueState = ($scavengerHuntState.slice(0, stateIndex) +
        T +
        $scavengerHuntState.slice(stateIndex + 1)) as ScavengerHuntStates
    $: newFalseState = ($scavengerHuntState.slice(0, stateIndex) +
        F +
        $scavengerHuntState.slice(stateIndex + 1)) as ScavengerHuntStates
</script>

{#if shown}
    <aside
        class="notification absolute position-horizontal-middle background-blur border-horizontal glow"
        transition:fade>
        {#if $cookiesAllowed}
            <form
                action="?/updateScavengerHuntState"
                method="POST"
                use:enhance={({ cancel }) => {
                    cancel()
                    shown = false
                    $scavengerHuntState = newFalseState
                    if ($cookiesAllowed) setJSCookie(scavengerHuntStateKey, newFalseState)
                }}>
                <Button
                    class="margin-horizontal-auto"
                    label="Hide notification"
                    underlined={true}
                    name={scavengerHuntStateKey}
                    value={newFalseState} />
            </form>
        {:else}
            <form on:submit={() => (shown = false)}>
                <HiddenInputs excludeStates={[scavengerHuntStateKey]} />
                <Button
                    class="margin-horizontal-auto"
                    label="Hide notification"
                    underlined={true}
                    name={scavengerHuntStateKey}
                    value={newFalseState} />
            </form>
        {/if}
        <slot />
    </aside>
{:else if $cookiesAllowed}
    <form
        action="?/updateScavengerHuntState"
        class="show-notification-form absolute position-horizontal-middle"
        method="POST"
        use:enhance={({ cancel }) => {
            cancel()
            shown = true
            $scavengerHuntState = newTrueState
            if ($cookiesAllowed) setJSCookie(scavengerHuntStateKey, newTrueState)
        }}>
        <Button label="show notification" name={scavengerHuntStateKey} value={newTrueState}>
            <Notification slot="icon" />
        </Button>
    </form>
{:else}
    <form class="show-notification-form absolute position-horizontal-middle" on:submit={() => (shown = true)}>
        <HiddenInputs excludeStates={[scavengerHuntStateKey]} />
        <Button label="show notification" name={scavengerHuntStateKey} value={newTrueState}>
            <Notification slot="icon" />
        </Button>
    </form>
{/if}
