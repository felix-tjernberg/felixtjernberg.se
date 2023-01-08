<script lang="ts">
    import NavigationWrapper from "./NavigationWrapper.svelte"
</script>

<NavigationWrapper>
    <section slot="phone">
        <p>phone</p>
    </section>
    <section slot="computer">
        <p>computer</p>
    </section>
    <section slot="welcome">
        <p>welcome</p>
    </section>
    <section slot="coach">
        <p>coach</p>
    </section>
    <section slot="contact">
        <p>contact</p>
    </section>
</NavigationWrapper>

<style>
    section {
        height: 100%;
        width: 100%;
    }
    p {
        margin: auto;
    }
    section[slot="phone"] {
        background-color: red;
    }
    section[slot="computer"] {
        background-color: green;
    }
    section[slot="welcome"] {
        background-color: blue;
    }
    section[slot="coach"] {
        background-color: yellow;
    }
    section[slot="contact"] {
        background-color: purple;
    }
</style>
