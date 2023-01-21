<script lang="ts">
    import FirstScreen from "./FirstScreen.svelte"
    const SCREENS = [FirstScreen]
    let screenIndex = 0
</script>

<section id="computer-section" class="flex-column-center">
    <h2 class="visually-hidden absolute">computer</h2>
    <div id="computer" class="flex-column-center">
        <svelte:component this={SCREENS[screenIndex]} bind:screenIndex />
    </div>
</section>

<style>
    #computer-section {
        height: 100%;
        width: 100%;
    }
    #computer {
        width: 500px;
        aspect-ratio: 1 / 1;
        background-color: #000000;
    }
</style>
