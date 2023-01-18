import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import PhoneSectionStory from "./PhoneSectionStory.svelte"
import textConversationJSON from "$components/TextConversation/textConversation"

type Story = StoryObj<PhoneSectionStory>
export const DefaultState: Story = {}

const meta: Meta<PhoneSectionStory> = {
    args: {},
    argTypes: {},
    component: PhoneSectionStory,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/felixtjernberg.se-design?node-id=119%3A2181&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=119%3A2181&show-proto-sidebar=0"
        },
        layout: "fullscreen"
    },
    tags: ["docsPage"],
    title: "Compositions/Phone Section"
}
export default meta

export const StoryMomCall: Story = {}
StoryMomCall.storyName = "Mom call"
StoryMomCall.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)
    const instructionMessage = await canvas.getByTestId("instruction-message")
    const cButton = await canvas.getByTestId("c-button")
    const display = await canvas.getByTestId("display")

    await expect(instructionMessage.textContent).toBe('Press "C" button to answer ')
    await expect(cButton).toBeTruthy()
    await expect(cButton).toHaveAttribute("data-flashing", "true")
    await expect(display.textContent).toBe("Mom calling")

    await userEvent.click(cButton)
    const nextMessageButton = await canvas.getByTestId("next-message-button")
    await expect(cButton).toHaveAttribute("data-flashing", "false")
    await expect(instructionMessage.textContent).toBe('Press "5 or ▼" button to see next message')
    await expect(cButton).not.toBeInTheDocument()
    await expect(display.textContent).toBe("Mom")
    await expect(nextMessageButton).toHaveAttribute("data-flashing", "true")

    const textConversation = await canvas.getByTestId("text-conversation")
    await expect(textConversation).toBeTruthy()

    for (const message in textConversationJSON) {
        await expect(display.textContent).toBe(message)
        await userEvent.click(nextMessageButton)
    }

    await expect(display).not.toBeInTheDocument()
}
