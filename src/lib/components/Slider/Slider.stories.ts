import type { Meta, StoryObj } from "@storybook/svelte"
import { expect } from "@storybook/jest"
import Slider from "./Slider.svelte"
import { within } from "@storybook/testing-library"

type Story = StoryObj<Slider>
export const DefaultState: Story = {}

const meta: Meta<Slider> = {
    argTypes: {
        description: {
            control: {
                type: "text"
            }
        },
        label: {
            control: {
                type: "text"
            }
        }
    },
    component: Slider,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/felixtjernberg.se-design?node-id=37%3A353&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=37%3A353&show-proto-sidebar=0"
        }
    },
    tags: ["docsPage"],
    title: "Components/Slider"
}
export default meta

const StoryDescriptionDescription = "This is a slider"
const StoryDescriptionLabel = "Slider"
export const StoryDescription: Story = {}
StoryDescription.storyName = "Expect description to render"
StoryDescription.args = {
    description: StoryDescriptionDescription,
    label: StoryDescriptionLabel
}
StoryDescription.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)
    const description = await canvas.getByText(StoryDescriptionDescription)
    await expect(description.textContent).toBe(StoryDescriptionDescription)
}
