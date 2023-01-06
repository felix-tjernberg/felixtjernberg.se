import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import NotificationStory from "./NotificationStory.svelte"

type Story = StoryObj<NotificationStory>
export const DefaultState: Story = {}
DefaultState.args = {
    active: true,
    sampleText: "This is a sample text"
}

const meta: Meta<NotificationStory> = {
    argTypes: {
        active: {
            control: {
                type: "boolean"
            }
        },
        closeButton: {
            control: {
                type: "boolean"
            }
        }
    },
    component: NotificationStory,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/felixtjernberg.se-design?node-id=37%3A387&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=37%3A387&show-proto-sidebar=0"
        }
    },
    tags: ["docsPage"],
    title: "Components/Notification"
}
export default meta

export const StoryNotActive: Story = {}
StoryNotActive.storyName = "Expect notification to not render when not active"
StoryNotActive.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const notification = await canvas.getByTestId("notification")
    await expect(notification.children[0]).toBeFalsy()
}

export const StoryActive: Story = {}
StoryActive.storyName = "Expect notification to render when active"
StoryActive.args = {
    active: true
}
StoryActive.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const notification = await canvas.getByTestId("notification")
    await expect(notification.children[0]).toBeTruthy()
}

export const StoryCloseWithButton: Story = {}
StoryCloseWithButton.storyName = "Expect notification to not render after pressing close button"
StoryCloseWithButton.args = {
    active: true
}
StoryCloseWithButton.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.getByRole("button")
    const notification = await canvas.getByTestId("notification").children[0]
    await userEvent.click(button)
    await expect(notification).not.toBeInTheDocument()
}

export const StoryCloseButton: Story = {}
StoryCloseButton.storyName = "Expect close notification button to render"
StoryCloseButton.args = {
    active: true
}
StoryCloseButton.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.getByRole("button")
    await expect(button).toBeTruthy()
}

export const StoryNoCloseButton: Story = {}
StoryNoCloseButton.storyName = "Expect close notification button not to render if closeButton is false"
StoryNoCloseButton.args = {
    active: true,
    closeButton: false,
    sampleText: "There is not button below"
}
StoryNoCloseButton.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const notification = await canvas.getByTestId("notification").children[0]
    await expect(notification.children[0]).toBeFalsy()
}
