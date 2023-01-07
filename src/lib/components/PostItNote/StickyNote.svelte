<script lang="ts">
    import Button from "$components/Button/Button.svelte"

    // TODO I have not gotten viteimagetools imports to work for storybook to work yet
    // import Picture from "$components/Picture.svelte"
    // import noteTextureSrcSet from "$assets/images/note-texture.png?w=250;300&webp&srcset"
    // import { src, width, height } from "$lib/assets/images/note-texture.png?width=300&metadata"
    import noteTexture from "$assets/images/note-texture.png"
    import tapeTexture from "$assets/images/tape-texture-1.png"

    let active = true
</script>

{#if active}
    <div class="sticky-note relative flex-center flex-column">
        <!-- TODO I have not gotten viteimagetools imports to work for storybook to work yet
             <Picture
            sources={{ srcset: noteTextureSrcSet, type: "webp" }}
            meta={{ src, width, height, alt: "sticky note texture created by Dalle-2" }} /> -->
        <picture>
            <img src={noteTexture} alt="sticky note texture created by Dalle-2" />
        </picture>
        <picture>
            <img src={tapeTexture} alt="sticky note texture created by Dalle-2" />
        </picture>
        <slot />
        <Button class="background-blur-900" glow={false} label="remove note" on:click={() => (active = false)} />
    </div>
{/if}

<style>
    div {
        aspect-ratio: 1/1;
        max-width: 50ch;
        padding: 1em;
        place-content: center;
    }
    :global(.sticky-note picture:nth-of-type(1)) {
        inset: 0;
    }
    :global(.sticky-note picture:nth-of-type(2)) {
        top: 0;
        translate: 0 -50%;
    }
    :global(.sticky-note picture:nth-of-type(2) img) {
        height: 25px;
        rotate: -1.337deg;
    }
    :global(.sticky-note picture) {
        position: absolute;
        z-index: -1;
    }
    :global(.sticky-note button),
    :global(.sticky-note img) {
        height: 100%;
        border-radius: 3px;
    }
    :global(.sticky-note p) {
        color: var(--gray-000);
    }
    :global(.sticky-note button),
    :global(.sticky-note p) {
        font-family: var(--font-accent) !important;
    }
    :global([data-dark-mode="false"] .sticky-note p) {
        color: var(--gray-900);
    }
    :global(.sticky-note button) {
        background-color: var(--gray-000-90-percent) !important;
        position: absolute !important;
        height: 100%;
        width: 100%;
        opacity: 0;
        transition: opacity 420ms ease-in-out;
        border: none !important;
        text-decoration: underline;
    }
    :global(.sticky-note:hover button),
    :global(.sticky-note button:focus) {
        opacity: 1;
    }
</style>
