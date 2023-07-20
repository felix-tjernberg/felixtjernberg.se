import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, waitFor, within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import sleep from "$lib/stories/sleep"
import TextConversation from "./TextConversation.svelte"

type Story = StoryObj<TextConversation>
export const DefaultState: Story = {}

const meta: Meta<TextConversation> = {
    argTypes: {
        label: { table: { disable: true } },
    },
    component: TextConversation,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/felixtjernberg.se-design?node-id=66%3A154&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=66%3A154&show-proto-sidebar=0",
        },
    },
    title: "Components/Text Conversation",
}
export default meta

export const StoryContinueDisabled: Story = {}
StoryContinueDisabled.storyName = "Expect continue button to be disabled/hidden during typing animation"
StoryContinueDisabled.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const conversationWrapper = await canvas.getByTestId("conversation-wrapper")
    await expect(conversationWrapper.children.length).toBe(1)
    await sleep(3500)
    const button = await canvas.getByRole("button")
    await userEvent.click(button)
    await expect(button).not.toBeInTheDocument()
    await sleep(3000)
    const button2 = await canvas.getByRole("button")
    await expect(button2).toBeInTheDocument()
    await userEvent.click(button2)
    await expect(button2).not.toBeInTheDocument()
    await sleep(9000)
    const button3 = await canvas.getByRole("button")
    await expect(button3).toBeInTheDocument()
}
