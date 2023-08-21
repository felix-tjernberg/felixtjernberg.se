<script lang="ts">
    import Overlay from "./Overlay.svelte"
    import SettingsText from "$assets/svgs/SettingsText.svelte"
    import BaseSettings from "$compositions/BaseSettings/BaseSettings.svelte"
</script>

<Overlay headerText="settings">
    <SettingsText slot="headerTextSVG" />
    <BaseSettings />
</Overlay>
