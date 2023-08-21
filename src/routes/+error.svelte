<script>
    import { page } from "$app/stores"
</script>

<div>
    {#if $page.status === 404}
        <h1>This is not the page you are looking for</h1>
        <iframe
            src="https://www.youtube-nocookie.com/embed/GO_xfR64qSk"
            title="YouTube video player, showing a scene from Star Wars Episode IV: A New Hope, where Obi-Wan Kenobi uses a Jedi mind trick to make a stormtrooper believe that these are not the droids he is looking for"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen />
        <a href="/">This is not the page I'm looking for</a>
    {:else}
        <h1>YOU DIED</h1>
        <iframe
            src="https://www.youtube-nocookie.com/embed/vxKBHX9Datw"
            title="YouTube video player, showing a scene from Fist of the North Star, where Upon unleashing his signature move Hokuto Hyakuretsu-ken, and tells his victim that they are already dead before his body erupts from the inside."
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen />
        <a href="/">Respawn <br /> (Go back to the first page)</a>
    {/if}
</div>

<style>
    iframe {
        aspect-ratio: 16/9;
        height: 50vh;
    }
    div {
        display: grid;
        place-content: center;
    }
    div > * {
        margin: auto;
    }
    h1,
    a {
        width: 100%;
        max-width: 100%;
        color: var(--white);
    }
</style>
