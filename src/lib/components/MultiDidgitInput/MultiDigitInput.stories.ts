import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import MultiDigitInput from "./MultiDigitInput.svelte"

type Story = StoryObj<MultiDigitInput>
export const DefaultState: Story = {}

const meta: Meta<MultiDigitInput> = {
    argTypes: {},
    component: MultiDigitInput,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/felixtjernberg.se-design?node-id=37%3A176&starting-point-node-id=37%3A176&show-proto-sidebar=0"
        }
    },
    tags: ["docsPage"],
    title: "Components/Multi Digit Input"
}
export default meta

export const StoryValuePropertyIsNaN: Story = {}
StoryValuePropertyIsNaN.storyName = 'Expect value property to be "" if not a number'
StoryValuePropertyIsNaN.args = {
    value: NaN
}
StoryValuePropertyIsNaN.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)
    const input = await canvas.getByRole("spinbutton")
    await expect(input.textContent).toBe("")
}
