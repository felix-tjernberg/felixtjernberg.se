import { expect, jest } from "@storybook/jest"
import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import ButtonStory from "./ButtonStory.svelte"
import { FUNCTION_TEST_STRING } from "./FUNCTION_TEST_STRING"

type Story = StoryObj<ButtonStory>
export const DefaultState: Story = {}

const meta: Meta<ButtonStory> = {
    argTypes: {
        iconTest: { table: { disable: true } },
        label: { control: { type: "text" } },
        underlined: { control: { type: "boolean" } }
    },
    component: ButtonStory,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/design?node-id=15%3A109&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=15%3A109&show-proto-sidebar=0"
        }
    },
    tags: ["docsPage"],
    title: "Components/Button"
}
export default meta

const Story1Label = "Hello world!"
export const Story1: Story = {}
Story1.args = {
    label: Story1Label
}
Story1.storyName = "Expect label to be rendered"
Story1.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)
    const button = await canvas.getByRole("button")
    await expect(button.textContent).toBe(Story1Label)
}

const Story2Label = "I'm underlined :)"
export const Story2: Story = {}
Story2.args = {
    label: Story2Label,
    underlined: true
}
Story2.storyName = "Underlined variant"

export const Story3: Story = {}
Story3.args = {
    iconTest: true,
    label: "settings"
}
Story3.storyName = "Icon variant"

export const Story4: Story = {}
Story4.args = {
    label: "test on:click",
    functionTest: true
}
Story4.storyName = "Expect on:click event forwarding"
Story4.play = async ({ canvasElement }) => {
    console.log = jest.fn()
    const canvas = within(canvasElement)
    const button = await canvas.getByRole("button")
    await userEvent.click(button)
    await expect(console.log).toHaveBeenCalledWith(FUNCTION_TEST_STRING)
}

export const Story5: Story = {}
Story5.args = {
    classTest: true,
    label: "$$props.class"
}
Story5.storyName = "Expect $$props.class overide"
Story5.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.getByRole("button")
    await expect(button).toHaveStyle({ backgroundColor: { b: 0, g: 0, r: 255 } })
}
