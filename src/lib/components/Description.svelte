<script lang="ts">
    import { browser } from "$app/environment"

    export let description: string
    export let noScriptDescription: string | false = false
</script>

{#if description}
    <div class="flex-column-center" data-js-available={browser}>
        {#if description || noScriptDescription}
            <p class="js-available-description">{description}</p>
            {#if noScriptDescription}
                <p class="no-script-description">{noScriptDescription}</p>
            {/if}
        {/if}

        <slot />
    </div>
{:else}
    <slot />
{/if}

<style>
    .no-script-description {
        display: none;
    }
    [data-js-available="false"] .js-available-description {
        display: none;
    }
    [data-js-available="false"] .no-script-description {
        display: block;
    }
    p {
        color: var(--gray-900);
        max-width: 100%;
        padding-top: 1em;
        rotate: -1.72deg;
        text-align: center;
        translate: -1em -0.5em;
        width: auto;
    }
</style>
