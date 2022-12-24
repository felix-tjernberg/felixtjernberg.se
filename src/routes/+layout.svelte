<script>
    import "$lib/stylesheets/stylesheets.css"

    import { browser } from "$app/environment"
    import { locale } from "svelte-intl-precompile"

    import StarfieldBackground from "$components/StarfieldBackground.svelte"

    $: if (browser) document.documentElement.lang = $locale
</script>

<StarfieldBackground />
<slot />
