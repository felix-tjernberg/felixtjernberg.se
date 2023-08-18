<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"
    import HideableNotification from "$components/Notification/HideableNotification.svelte"
    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { NavigationSchema, navigationState, navigationStateKey } from "$stores/states/navigation"
    import { D, scavengerHuntState } from "$stores/states/scavengerHuntState"

    $: screenState = $scavengerHuntState[0]
</script>

{#if screenState === "6"}
    {#if $scavengerHuntState[1] !== D}
        <HideableNotification stateIndex={1} state={$scavengerHuntState[1]}>
            <p>mom is calling</p>
            {#if $cookiesAllowed}
                <Button
                    href="/phone"
                    label="Go answer the phone"
                    underlined={true}
                    on:click={() => ($navigationState = NavigationSchema.enum.phone)} />
            {:else}
                <form on:submit={() => ($navigationState = NavigationSchema.enum.phone)}>
                    <HiddenInputs excludeStates={[navigationStateKey]} />
                    <Button
                        underlined={true}
                        label="Go answer the phone"
                        name={navigationStateKey}
                        value={NavigationSchema.enum.phone} />
                </form>
            {/if}
        </HideableNotification>
    {/if}
    {#if $scavengerHuntState[2] !== D}
        <HideableNotification stateIndex={2} state={$scavengerHuntState[2]}>
            <p>So how many mg did she need?</p>
        </HideableNotification>
    {/if}
{/if}
