<script lang="ts">
    import StickyNote from "./StickyNote.svelte"
    export let sampleText: string | undefined
    export let gridTest: boolean | undefined
</script>

{#if gridTest}
    <div class="grid-wrapper">
        <div class="grid">
            {#each [1, 2, 3, 4] as number}
                <div class="relative">
                    {#each [1, 2, 3, 4] as _}
                        <StickyNote flyToRight={Boolean(number % 2)}>
                            <p>{number}</p>
                        </StickyNote>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
{:else}
    <div class="default">
        <StickyNote>
            <p>{sampleText}</p>
        </StickyNote>
    </div>
{/if}

<style>
    .grid-wrapper {
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    .grid {
        height: 50vh;
        width: 50vw;
        display: grid;
        grid-template-columns: 110px auto 110px;
        grid-template-rows: 110px auto 110px;
        grid-template-areas:
            "a . b"
            ". . ."
            "c . d";
    }
    .relative:nth-of-type(1) {
        grid-area: a;
    }
    .relative:nth-of-type(2) {
        grid-area: b;
    }
    .relative:nth-of-type(3) {
        grid-area: c;
    }
    .relative:nth-of-type(4) {
        grid-area: d;
    }

    .default {
        aspect-ratio: 1/1;
        width: 50ch;
    }
    @media (max-width: 300px) {
        .default {
            width: 222px;
        }
    }
</style>
