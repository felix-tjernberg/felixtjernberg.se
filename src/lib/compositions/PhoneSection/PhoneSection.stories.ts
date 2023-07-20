import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import PhoneSectionStory from "./PhoneSectionStory.svelte"
import sleep from "$lib/stories/sleep"
import TEXT_CONVERSATION from "$lib/components/TextConversation/textConversation"

type Story = StoryObj<PhoneSectionStory>
export const DefaultState: Story = {}

const meta: Meta<PhoneSectionStory> = {
    args: {},
    argTypes: {},
    component: PhoneSectionStory,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/felixtjernberg.se-design?node-id=119%3A2181&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=119%3A2181&show-proto-sidebar=0",
        },
        layout: "fullscreen",
    },
    title: "Compositions/Phone Section",
}
export default meta

export const StoryMomCalling: Story = {}
StoryMomCalling.storyName = "Mom calling"
StoryMomCalling.args = {
    momCallingTest: true,
}

export const StoryTestMomCall: Story = {}
StoryTestMomCall.storyName = "Test mom call"
StoryTestMomCall.args = {
    momCallingTest: true,
}
StoryTestMomCall.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)
    const instructionMessage = await canvas.getByTestId("answer-instruction")
    const cButton = await canvas.getByTestId("c-button")

    await expect(instructionMessage.textContent).toContain("to answer")
    await expect(cButton).toHaveClass("opacity-flashing")

    await userEvent.click(cButton)
    await expect(cButton).not.toBeInTheDocument()
    await sleep(5000)

    const nextMessageButton = await canvas.getByTestId("next-message-button")
    await expect(instructionMessage.textContent).toContain("next message")
    await expect(nextMessageButton.children[0]).toHaveClass("opacity-flashing")
    await userEvent.click(nextMessageButton)
    await sleep(5000)

    const nextMessage2Button = await canvas.getByTestId("next-message-button")
    await expect(nextMessage2Button.children[0]).not.toHaveClass("opacity-flashing")

    for (let i = 0; i < TEXT_CONVERSATION.length - 2; i++) {
        const nextMessageButton = await canvas.getByTestId("next-message-button")
        await userEvent.click(nextMessageButton)
        await sleep(10000)
    }

    await sleep(1000)
    await expect(instructionMessage).not.toBeInTheDocument()
}
