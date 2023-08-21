<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import { scavengerHuntStateKey, type ScavengerHuntStates } from "$stores/states/scavengerHuntState"
    export let newScavengerHuntState: ScavengerHuntStates
</script>

<Button
    blur={false}
    glow={false}
    hoverOverlay={false}
    label="remove note"
    name={scavengerHuntStateKey}
    value={newScavengerHuntState}
    testid="remove-note"
    on:click={(event) => {
        const currentTarget = event.currentTarget
        // TODO: Solve below @ts-ignores
        // @ts-ignore
        currentTarget.blur()
        // @ts-ignore
        currentTarget.style.opacity = "0"
    }} />
