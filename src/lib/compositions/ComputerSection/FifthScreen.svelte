<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import Coach from "$components/Coach/Coach.svelte"
    import SingleDigitInput from "$components/SingleDigitInput/SingleDigitInput.svelte"

    import { fade } from "svelte/transition"
    import { answerKey } from "./formKeys"
</script>

<div id="fifth-screen" class="flex-column relative" in:fade>
    <Coach />
    <div id="fifth-screen-content" class="margin-vertical-auto">
        <p class="font-family-primary-fat font-size-100 text-transform-capitalize">
            How many years did <br />
            Felix Tjernberg <br />
            coach american football?
        </p>
        <SingleDigitInput name={answerKey} label="years felix coached" testid="coach-years-number-input" />
        <Button label="Submit answer" class="margin-horizontal-auto" type="submit" />
    </div>
</div>

<style>
    #fifth-screen-content {
        overflow-y: auto;
    }
    #fifth-screen {
        max-height: calc(100vh - var(--static-scale-300));
        padding: 1em 0.5em;
        overflow: hidden;
    }
    :global(#fifth-screen > :nth-child(1)) {
        opacity: 0.337;
    }
</style>
