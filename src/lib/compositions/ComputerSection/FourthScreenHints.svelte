<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"
    import HideableNotification from "$components/Notification/HideableNotification.svelte"

    import {
        D,
        scavengerHuntState,
        scavengerHuntStateKey,
        type ScavengerHuntStates,
    } from "$stores/states/scavengerHuntState"

    const hintState2 = "4DTDDDD" as ScavengerHuntStates
    const hintState3 = "4DDTDDD" as ScavengerHuntStates
    const hintState4 = "4DDDTDD" as ScavengerHuntStates
    const hintState5 = "4DDDDTD" as ScavengerHuntStates
    const hintState6 = "4DDDDDT" as ScavengerHuntStates

    // For some reason the compiler did not understand that this statement had been updated in ComputerSection and that FourthScreenHints component should not be rendered
    $: screenState = $scavengerHuntState[0]
</script>

{#if screenState === "4"}
    {#if $scavengerHuntState[1] !== D}
        <HideableNotification stateIndex={1} state={$scavengerHuntState[1]}>
            <p>Do you need any hints?</p>
            <form on:submit={() => ($scavengerHuntState = hintState2)}>
                <HiddenInputs excludeStates={[scavengerHuntStateKey]} />
                <Button
                    class="margin-horizontal-auto"
                    label="Yes give me a hint"
                    underlined={true}
                    name={scavengerHuntStateKey}
                    value={hintState2} />
            </form>
        </HideableNotification>
    {/if}
    {#if $scavengerHuntState[2] !== D}
        <HideableNotification stateIndex={2} state={$scavengerHuntState[2]}>
            <p>
                The song is 3:08 <br />which means<br />
                3 minutes and 8 seconds
            </p>
            <form on:submit={() => ($scavengerHuntState = hintState3)}>
                <HiddenInputs excludeStates={[scavengerHuntStateKey]} />
                <Button
                    class="margin-horizontal-auto"
                    label="I want another hint"
                    underlined={true}
                    name={scavengerHuntStateKey}
                    value={hintState3} />
            </form>
        </HideableNotification>
    {/if}
    {#if $scavengerHuntState[3] !== D}
        <HideableNotification stateIndex={3} state={$scavengerHuntState[3]}>
            <p>1 minute = 60 seconds</p>
            <form on:submit={() => ($scavengerHuntState = hintState4)}>
                <HiddenInputs excludeStates={[scavengerHuntStateKey]} />
                <Button
                    class="margin-horizontal-auto"
                    label="I still don't get it xD"
                    underlined={true}
                    name={scavengerHuntStateKey}
                    value={hintState4} />
            </form>
        </HideableNotification>
    {/if}
    {#if $scavengerHuntState[4] !== D}
        <HideableNotification stateIndex={4} state={$scavengerHuntState[4]}>
            <p>3 minutes = 3*60</p>
            <form on:submit={() => ($scavengerHuntState = hintState5)}>
                <HiddenInputs excludeStates={[scavengerHuntStateKey]} />
                <Button
                    class="margin-horizontal-auto"
                    label="Uhm... I still don't get the full picture"
                    underlined={true}
                    name={scavengerHuntStateKey}
                    value={hintState5} />
            </form>
        </HideableNotification>
    {/if}
    {#if $scavengerHuntState[5] !== D}
        <HideableNotification stateIndex={5} state={$scavengerHuntState[5]}>
            <p>
                3*60 = x<br />
                8 = y<br />
                x + y = z<br />
                z = number of seconds
            </p>
            <form id="hate-form" on:submit={() => ($scavengerHuntState = hintState6)}>
                <HiddenInputs excludeStates={[scavengerHuntStateKey]} />
                <Button
                    class="margin-horizontal-auto"
                    label={"OH GOD I HATE COUNTING WITH LETTERS!!! Please spell it out for me"}
                    underlined={true}
                    name={scavengerHuntStateKey}
                    value={hintState6} />
            </form>
        </HideableNotification>
    {/if}
    {#if $scavengerHuntState[6] !== D}
        <HideableNotification stateIndex={6} state={$scavengerHuntState[6]}>
            <p>
                3*60 = 180<br />
                8 = 8<br />
                180 + 8 = 188<br />
                The song is 188 number of seconds
            </p>
        </HideableNotification>
    {/if}
{/if}

<style>
    #hate-form :global(button) {
        max-width: 100%;
    }
</style>
