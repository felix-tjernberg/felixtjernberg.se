<script lang="ts">
    import AnswerForm from "./AnswerForm.svelte"
    import Coach from "$components/Coach/Coach.svelte"
    import SingleDigitInput from "$components/SingleDigitInput/SingleDigitInput.svelte"

    import { fade } from "svelte/transition"
    import { answerKey, validateS5AnswerKey } from "./answerFormKeys"
</script>

<div id="fifth-screen" class="flex-column relative" in:fade>
    <Coach />
    <div id="fifth-screen-content" class="margin-vertical-auto">
        <p class="font-family-primary-fat font-size-100 text-transform-capitalize">
            How many years did <br />
            Felix Tjernberg <br />
            coach american football?
        </p>
        <AnswerForm action={validateS5AnswerKey}>
            <p slot="errorMessage" class="margin-horizontal-auto">incorrect number of years</p>
            <SingleDigitInput name={answerKey} label="years felix coached" testid="coach-years-number-input" />
        </AnswerForm>
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
