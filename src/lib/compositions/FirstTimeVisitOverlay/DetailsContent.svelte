<script lang="ts">
    // @ts-nocheck //TODO this is because I can not figure out why typewriter is giving an error
    import typewriter from "$utilities/transitions/typewriter"

    export let details: HTMLElement
    export let detailsOpen: boolean

    let firstParagrafDone = false
    let secondParagrafDone = false

    $: if (!detailsOpen) {
        firstParagrafDone = false
        secondParagrafDone = false
    }
</script>

<p
    class="margin-horizontal"
    in:typewriter={{ containerElement: details }}
    on:introend={() => (firstParagrafDone = true)}>
    The data is only stored in your browsers local storage and should be anonymous enough to not allow anyone inferring
    who you are as a person
</p>
{#if firstParagrafDone}
    <p
        class="margin-horizontal"
        in:typewriter={{ containerElement: details }}
        on:introend={() => (secondParagrafDone = true)}>
        But who knows big tech (your browser) might be able to use this information as a base for an AI model to infer
        who you are
    </p>
{/if}
{#if secondParagrafDone}
    <p class="margin-horizontal" in:typewriter={{ containerElement: details }}>
        If you do not accept cookies the data to drive the website state will only be stored in temporary javascript
        variables, this means I can't remember anything about you between page visits
    </p>
{/if}

<style>
    .margin-horizontal {
        --margin-horizontal-amount: auto;
    }
</style>
