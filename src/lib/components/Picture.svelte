<script lang="ts">
    export let sources: { srcset: string; type: string; media?: string }[]
    export let meta: {
        src: string
        alt: string
        height: number
        width: number
    }
</script>

<picture>
    {#each sources as source}
        <source
            srcset={source.srcset}
            type={source.type}
            media={source.media} />
    {/each}
    <img src={meta.src} alt={meta.alt} />
</picture>
