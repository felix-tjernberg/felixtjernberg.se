import type { Meta, StoryObj } from "@storybook/svelte"
import ButtonStory from "./ButtonStory.svelte"
import { expect } from "@storybook/jest"
import { within } from "@storybook/testing-library"

type Story = StoryObj<ButtonStory>

const meta: Meta<ButtonStory> = {
    component: ButtonStory,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/design?node-id=15%3A109&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=15%3A109&show-proto-sidebar=0"
        }
    },
    tags: ["docsPage"],
    title: "Compositions/Button"
}
export default meta

export const DefaultState: Story = {}

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
    underlineVariant: true
}
Story2.storyName = "Underlined variant"
Story2.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.getByRole("button")
    // TODO: create a test for checking if the button is underlined
}

export const Story3: Story = {
    label: 0
}
Story3.storyName = "Expect on:click to work"
Story3.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.getByRole("button")
    // TODO create a test for clicking the button
}
