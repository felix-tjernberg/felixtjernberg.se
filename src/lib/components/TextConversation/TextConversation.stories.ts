import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import sleep from "$lib/stories/sleep"
import TextConversation from "./TextConversation.svelte"

type Story = StoryObj<TextConversation>
export const DefaultState: Story = {}

const meta: Meta<TextConversation> = {
    argTypes: {
        label: { table: { disable: true } }
    },
    component: TextConversation,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/felixtjernberg.se-design?node-id=66%3A154&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=66%3A154&show-proto-sidebar=0"
        }
    },
    tags: ["docsPage"],
    title: "Components/Text Conversation"
}
export default meta

export const StorySeeAllMessages: Story = {}
StorySeeAllMessages.storyName = "Expect to see all messages after clicking continue button X times"
StorySeeAllMessages.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const button = await canvas.getByRole("button")
    const conversationWrapper = await canvas.getByTestId("conversation-wrapper")
    for (let i = 1; i <= 9; i++) {
        await expect(conversationWrapper.children.length).toBe(i)
        await userEvent.click(button)
    }
}

export const StoryContinueDisabled: Story = {}
StoryContinueDisabled.storyName = "Expect continue button to be disabled/hidden during typing animation"
StoryContinueDisabled.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const conversationWrapper = await canvas.getByTestId("conversation-wrapper")
    await expect(conversationWrapper.children.length).toBe(1)
    await sleep(3000)
    const button = await canvas.getByRole("button")
    for (let index = 0; index < 3; index++) {
        await userEvent.click(button)
        await expect(button).not.toBeInTheDocument()
        await sleep(3000)
        await expect(button).toBeInTheDocument()
    }
}
