<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import BooleanButton from "$components/BooleanButton/BooleanButton.svelte"
    import MultiDigitInput from "$components/MultiDigitInput/MultiDigitInput.svelte"
    import SingleDigitInput from "$components/SingleDigitInput/SingleDigitInput.svelte"
    import Notification from "$components/Notification/Notification.svelte"
    import TextConversation from "$components/TextConversation/TextConversation.svelte"
    import Slider from "$components/Slider/Slider.svelte"
    import TextInput from "$components/TextInput/TextInput.svelte"
    import SettingsIcon from "$assets/svgs/SettingsIcon.svelte"
    import StickyNote from "$components/StickyNote/StickyNote.svelte"
</script>

<div id="all-components" class="flex-column-center">
    <div id="all-components-box" class="margin-vertical-flow flex-column-center glow background-blur border">
        <Button label="there" underlined={true} />
        <Button label="how"><SettingsIcon slot="icon" /></Button>
        <Button label="hi!!!" />
        <BooleanButton labels={["on", "off"]} />
        <BooleanButton labels={["on", "off"]}>
            <SettingsIcon slot="firstIcon" />
            <SettingsIcon slot="secondIcon" />
        </BooleanButton>
        <Slider label="slider" />
        <MultiDigitInput label="multi digit input" value={1337} />
        <SingleDigitInput label="single digit input" />
        <TextInput label="text input" />
        <div class="sticky-wrapper relative">
            {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as number}
                <StickyNote flyToRight={Boolean(number % 2)}>
                    <p>
                        {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as _}soi<wbr /> {/each}
                    </p>
                </StickyNote>
            {/each}
        </div>
    </div>
    <TextConversation />
    <Notification active={true}><p>Some text goes here</p></Notification>
</div>

<style>
    #all-components-box {
        --margin-amount: 100px;
        --background-blur-amount: var(--blur-900);
        --stroke-color: var(--gray-100);
        --stroke-width: var(--stroke-300);
        --glow-color: var(--gray-100);
        margin: 200px 0;
        padding: 2em 1em;
        width: 90vh;
    }
    #all-components:last-child {
        margin-bottom: 200px;
    }
    .sticky-wrapper {
        text-shadow: none;
        filter: none;
        aspect-ratio: 1;
        width: 200px;
    }
</style>
