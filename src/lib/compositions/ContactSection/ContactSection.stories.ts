import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import CoachSectionStory from "./ContactSectionStory.svelte"
import { expect } from "@storybook/jest"

type Story = StoryObj<CoachSectionStory>
export const DefaultState: Story = {}

const meta: Meta<CoachSectionStory> = {
    args: {},
    argTypes: {},
    component: CoachSectionStory,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/felixtjernberg.se-design?node-id=119%3A2146&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=119%3A2146&show-proto-sidebar=0"
        },
        layout: "fullscreen"
    },
    tags: ["docsPage"],
    title: "Compositions/Contact Section"
}
export default meta

export const StoryRenderEmailAndPhoneNumber: Story = {}
StoryRenderEmailAndPhoneNumber.args = {
    testScavengerHuntDoneStore: true
}
StoryRenderEmailAndPhoneNumber.storyName = "Expect email and phone number to render when scavengerHuntDoneStore is true"
StoryRenderEmailAndPhoneNumber.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const emailAndPhoneParagraf = await canvas.getByTestId("email-and-phone-paragraf")
    await expect(emailAndPhoneParagraf).toBeTruthy()
}
