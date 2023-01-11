<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import BooleanButton from "$components/BooleanButton/BooleanButton.svelte"
    import MultiDigitInput from "$components/MultiDigitInput/MultiDigitInput.svelte"
    import SingleDigitInput from "$components/SingleDigitInput/SingleDigitInput.svelte"
    import Notification from "$components/Notification/Notification.svelte"
    import TextConversation from "$components/TextConversation/TextConversation.svelte"
    import Slider from "$components/Slider/Slider.svelte"
    import TextInput from "$components/TextInput/TextInput.svelte"
    import SettingsIcon from "$assets/icons/SettingsIcon.svelte"
    import StickyNote from "$components/StickyNote/StickyNote.svelte"
    import Coach from "$components/Coach/Coach.svelte"
</script>

<div class="margin-vertical-flow flex-column flex-center">
    <Button label="there" underlined={true} />
    <Button label="how"><SettingsIcon slot="icon" /></Button>
    <Button label="hi" />
    <BooleanButton labels={["on", "off"]} />
    <BooleanButton labels={["on", "off"]}>
        <SettingsIcon slot="firstIcon" />
        <SettingsIcon slot="secondIcon" />
    </BooleanButton>
    <Slider label="slider" />
    <MultiDigitInput label="multi digit input" value={1337} />
    <SingleDigitInput label="single digit input" />
    <TextInput label="text input" />
    <TextConversation />
    <div class="sticky-wrapper relative">
        {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as number}
            <StickyNote flyToRight={Boolean(number % 2)}>
                <p>soisoisoisoisoisoisoi</p>
            </StickyNote>
        {/each}
    </div>
    <Coach />
</div>
<Notification active={true}><p>Some text goes here</p></Notification>

<style>
    div.margin-vertical-flow {
        width: 90vh;
        backdrop-filter: blur(2px) saturate(50%);
        padding: 2em 1em;
        margin: 200px 0;
        border: 4px solid var(--gray-100);
    }
    .sticky-wrapper {
        width: 200px;
        aspect-ratio: 1;
    }
    :global([data-dark-mode="false"] div.margin-vertical-flow) {
        background-color: var(--gray-000-50-percent);
    }
</style>
