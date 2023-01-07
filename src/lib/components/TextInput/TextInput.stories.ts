import type { Meta, StoryObj } from "@storybook/svelte"
import { expect } from "@storybook/jest"
import TextInput from "./TextInput.svelte"
import { within } from "@storybook/testing-library"

type Story = StoryObj<TextInput>
export const DefaultState: Story = {}

const meta: Meta<TextInput> = {
    argTypes: {
        label: { table: { disable: true } }
    },
    component: TextInput,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/felixtjernberg.se-design?node-id=116%3A377&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=116%3A377&show-proto-sidebar=0"
        }
    },
    tags: ["docsPage"],
    title: "Components/Text Input"
}
export default meta

export const StoryPlaceholder: Story = {}
StoryPlaceholder.storyName = "Expect placeholder to change and label"
StoryPlaceholder.args = {
    placeholder: "I like trains"
}
StoryPlaceholder.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const input = (await canvas.getByRole("textbox")) as HTMLInputElement
    await expect(input.placeholder).toBe("I like trains")
}

export const StoryCaret: Story = {}
StoryCaret.storyName = "Expect caret to be custom"
StoryCaret.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const input = (await canvas.getByRole("textbox")) as HTMLInputElement
    await expect(input.style.caretColor).toBe("transparent")
    //TODO make test that checks if there is a custom caret rendered
}
