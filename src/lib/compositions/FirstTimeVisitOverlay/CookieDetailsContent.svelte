<script lang="ts">
    // @ts-nocheck //TODO this is because I can not figure out why typewriter is giving an error
    import typewriter from "$utilities/transitions/typewriter"

    import { browser } from "$app/environment"

    export let details: HTMLElement
    export let detailsOpen = browser ? false : true

    let part1Done = true
    let part2Done = true
    let part3Done = true
    let part4Done = true
    let part5Done = true

    if (browser) {
        part1Done = false
        part2Done = false
        part3Done = false
        part4Done = false
        part5Done = false
    }

    $: detailsOpen = browser ? detailsOpen : true
</script>

<p class="margin-horizontal">
    {#if detailsOpen || part1Done}
        <span in:typewriter={{ containerElement: details }} on:introend={() => (part1Done = true)}>
            This website does not use any cookies or state that could be used to infer who you are as a person, however
            it supports saving the state of the application in cookies,
        </span>
    {/if}
    <a
        href="https://support.cookieinformation.com/en/articles/5405196-all-you-need-to-know-about-cookies?q=url+search+parameters#h_faff1ed198"
        target="_blank">
        {#if part1Done}
            <span in:typewriter={{ containerElement: details }} on:introend={() => (part2Done = true)}>
                these are considered as functional cookies
            </span>
        {/if}
    </a>
</p>

<p class="margin-horizontal">
    {#if part2Done}
        <span in:typewriter={{ containerElement: details }} on:introend={() => (part3Done = true)}>
            If you do not accept the functional cookies the website keeps track of state by using url search parameters,
            url search parameters are not usually considered as cookies, but I guess could be argued that they are
        </span>
    {/if}
    <a
        href="https://support.cookieinformation.com/en/articles/5405196-all-you-need-to-know-about-cookies?q=url+search+parameters#h_f4c7274e1d"
        target="_blank">
        {#if part3Done}
            <span in:typewriter={{ containerElement: details }} on:introend={() => (part4Done = true)}>
                strictly necessary cookies
            </span>
        {/if}
    </a>
    {#if part4Done}
        <span in:typewriter={{ containerElement: details }} on:introend={() => (part5Done = true)}>
            in this case, so I inform you about it just in case :)
        </span>
    {/if}
</p>
{#if part5Done}
    <p class="margin-horizontal" in:typewriter={{ containerElement: details }}>
        If you do not agree with the use of any cookies I must ask you to leave :(
    </p>
{/if}

<style>
    .margin-horizontal {
        --margin-horizontal-amount: auto;
    }
    p {
        text-wrap: wrap;
    }
</style>
