import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import Notification from "./Notification.svelte"

type Story = StoryObj<Notification>
export const DefaultState: Story = {}

const meta: Meta<Notification> = {
    argTypes: {},
    component: Notification,
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
    await expect(notification).not.toBeInTheDocument()
}

export const StoryActive: Story = {}
StoryActive.storyName = "Expect notification to render when active"
StoryActive.args = {
    active: true
}
StoryActive.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const notification = await canvas.getByTestId("notification")
    await expect(notification).toBeInTheDocument()
}

export const StoryCloseWithButton: Story = {}
StoryCloseWithButton.storyName = "Expect pressing close notification button to remove notification"
StoryCloseWithButton.args = {
    active: true
}
StoryCloseWithButton.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.getByText("close notification")
    const notification = await canvas.getByTestId("notification")
    await userEvent.click(button)
    await expect(notification).not.toBeInTheDocument()
}

export const StoryNoCloseButton: Story = {}
StoryNoCloseButton.storyName = "No close notification button"
StoryNoCloseButton.args = {
    active: true,
    noCloseButton: true
}
StoryNoCloseButton.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.getByText("close notification")
    const notification = await canvas.getByTestId("notification")
    await userEvent.click(button)
    await expect(notification).not.toBeInTheDocument()
}
