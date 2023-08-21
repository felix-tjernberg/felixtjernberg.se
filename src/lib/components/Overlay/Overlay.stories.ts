// import { expect, jest } from "@storybook/jest"
import type { Meta, StoryObj } from "@storybook/svelte"
// import { userEvent, within } from "@storybook/testing-library"
import OverlayStory from "./OverlayStory.svelte"
// import sleep from "$lib/stories/sleep"

type Story = StoryObj<OverlayStory>
export const DefaultState: Story = {}

const meta: Meta<OverlayStory> = {
    argTypes: {},
    component: OverlayStory,
    parameters: {},
    title: "Components/Overlay",
}
export default meta
