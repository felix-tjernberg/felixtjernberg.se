import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import ButtonStory from "./ButtonStory.svelte"
import { expect } from "@storybook/jest"
import { FUNCTION_TEST_STRING } from "./FUNCTION_TEST_STRING"

type Story = StoryObj<ButtonStory>
export const DefaultState: Story = {}

const meta: Meta<ButtonStory> = {
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

const story1Label = "Hello world!"
export const Story1: Story = {
    label: story1Label
}
Story1.storyName = "Expect label to be rendered"
Story1.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.getByRole("button")
    await expect(button.textContent).toBe(story1Label)
}

const story2Label = "I'm underlined :)"
export const Story2: Story = {
    label: story2Label,
    underLine: true
}
Story2.storyName = "Underlined variant"

export const Story3: Story = {
    icon: true
}
Story3.storyName = "Icon variant"

export const Story4: Story = {
    label: "test on:click"
}
Story4.storyName = "Expect on:click event forwarding"
Story4.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.getByRole("button")
    await userEvent.click(button)
    await expect(console.log).toHaveBeenCalledWith(FUNCTION_TEST_STRING)
}

export const Story5: Story = {
    label: "$$props.class"
}
Story5.storyName = "Expect $$props.class style overide"
Story5.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.getByRole("button")
    await expect(button).toHaveStyle("background-color: red")
}
