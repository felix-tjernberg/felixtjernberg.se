<script lang="ts">
    import AnswerForm from "./AnswerForm.svelte"
    import TextInput from "$components/TextInput/TextInput.svelte"

    import { fade } from "svelte/transition"

    import { answerKey, validateS3AnswerKey } from "./answerFormKeys"
</script>

<div id="third-screen" class="flex-column height-100percent" in:fade>
    <p class="font-family-primary-fat padding-horizontal text-transform-capitalize">
        Are you ready to start the scavenger hunt?
    </p>
    <AnswerForm action={validateS3AnswerKey}>
        <p slot="errorMessage" class="margin-horizontal-auto">That's not the word yes!</p>
        <TextInput
            name={answerKey}
            label="answer"
            placeholder={'type "yes" here'}
            testid="start-scavenger-hunt-text-input" />
    </AnswerForm>
</div>

<style>
    #third-screen {
        max-height: calc(100vh - var(--static-scale-300));
        overflow-y: auto;
    }
    #third-screen > p {
        margin-top: auto;
    }
    #third-screen > :global(form) {
        margin-bottom: auto;
    }
</style>
