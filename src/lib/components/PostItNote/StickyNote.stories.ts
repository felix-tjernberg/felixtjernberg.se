import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import StickyNoteStory from "./StickyNoteStory.svelte"

type Story = StoryObj<StickyNoteStory>
export const DefaultState: Story = {}

const meta: Meta<StickyNoteStory> = {
    args: {
        sampleText: "Prow scuttle parrel provost Sail! Ho shrouds spirits boom mizzenmast yardarm."
    },
    argTypes: {
        sampleText: {
            control: {
                type: "text"
            }
        }
    },
    component: StickyNoteStory,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/felixtjernberg.se-design?node-id=40%3A764&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=40%3A764&show-proto-sidebar=0"
        },
        layout: "fullscreen"
    },
    tags: ["docsPage"],
    title: "Components/Post It Note"
}
export default meta

export const StoryCloseButton: Story = {}
StoryCloseButton.storyName = "Expect remove note button to render"
StoryCloseButton.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.getByRole("button")
    await expect(button).toBeTruthy()
}

export const StoryCloseWithButton: Story = {}
StoryCloseWithButton.storyName = "Expect note to not render after pressing Remove Note"
StoryCloseWithButton.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.getByRole("button")
    const note = await canvas.getByTestId("note").children[0]
    await userEvent.click(button)
    await expect(note).not.toBeInTheDocument()
}
