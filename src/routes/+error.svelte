<script>
    import { page } from "$app/stores"
</script>

<div>
    {#if $page.status === 404}
        <h1>This page is not what you are looking for</h1>
        <iframe
            style="width: 100%; max-width: 1280px; aspect-ratio: 16/9;"
            src="https://www.youtube-nocookie.com/embed/GO_xfR64qSk"
            title="YouTube video player, showing a scene from Star Wars Episode IV: A New Hope, where Obi-Wan Kenobi uses a Jedi mind trick to make a stormtrooper believe that these are not the droids he is looking for"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen />
        <a href="/">This is not the page I'm looking for</a>
    {:else}
        <h1>YOU DIED</h1>
        <iframe
            style="width: 100%; max-width: 1280px; aspect-ratio: 16/9;"
            src="https://www.youtube-nocookie.com/embed/vxKBHX9Datw"
            title="YouTube video player, showing a scene from Fist of the North Star, where Upon unleashing his signature move Hokuto Hyakuretsu-ken, and tells his victim that they are already dead before his body erupts from the inside."
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen />
        <a href="/">Respawn <br /> (Go back to the first page)</a>
    {/if}
</div>

<style>
    div {
        display: grid;
        place-content: center;
        min-height: 100vh;
    }
    div > * {
        margin: auto;
    }
</style>
