import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import CoachSectionStory from "./ContactSectionStory.svelte"
import { expect } from "@storybook/jest"

type Story = StoryObj<CoachSectionStory>
export const DefaultState: Story = {}

const meta: Meta<CoachSectionStory> = {
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
StoryRenderEmailAndPhoneNumber.storyName = "Expect email and phone number to render when scavengerHuntDoneStore is true"
StoryRenderEmailAndPhoneNumber.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)
    const scavengerHuntParagraph = await canvas.getByTestId("scavenger-hunt-paragraph")
    await expect(scavengerHuntParagraph).toBeTruthy()
    const scavengerHuntButtonDone = await canvas.getByTestId("scavenger-hunt-button")
    await userEvent.click(scavengerHuntButtonDone)
    const emailAndPhoneParagraf = await canvas.getByTestId("email-and-phone-paragraph")
    await expect(emailAndPhoneParagraf).toBeTruthy()
}

export const StoryNavigateToCoachSection: Story = {}
StoryNavigateToCoachSection.storyName = "Expect to navigate to coach section when clicking on the coach section link"
StoryNavigateToCoachSection.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const coachSectionLink = await canvas.getByText("Go to scavenger hunt")
    const sectionIndicator = await canvas.getByTestId("navigation-indicator")
    await userEvent.click(coachSectionLink)
    await expect(sectionIndicator.textContent).toBe("coach")
}
