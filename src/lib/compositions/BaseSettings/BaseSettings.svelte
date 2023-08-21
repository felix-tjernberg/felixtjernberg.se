<script lang="ts">
    import AudioVolume from "$components/AudioVolume.svelte"
    import BooleanButton from "$components/BooleanButton/BooleanButton.svelte"
    import Moon from "$assets/svgs/Moon.svelte"
    import Sun from "$assets/svgs/Sun.svelte"

    import { darkMode, darkModeKey } from "$stores/settings/darkMode"
    import { likesEightBitFont, likesEightBitFontKey } from "$stores/settings/likesEightBitFont"
</script>

<AudioVolume />
<BooleanButton
    booleanName={likesEightBitFontKey}
    description="Do you like reading the 8bit font?"
    labels={["yes", "no"]}
    bind:boolean={$likesEightBitFont} />
<BooleanButton
    booleanName={darkModeKey}
    description="If you need higher contrast or like light theme click the sun"
    labels={["dark", "light"]}
    testid="dark-mode"
    bind:boolean={$darkMode}>
    <Moon slot="firstIcon" />
    <Sun slot="secondIcon" />
</BooleanButton>
