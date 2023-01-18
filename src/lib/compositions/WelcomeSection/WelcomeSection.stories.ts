import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import WelcomeSectionStory from "./WelcomeSectionStory.svelte"

type Story = StoryObj<WelcomeSectionStory>
export const DefaultState: Story = {}

const meta: Meta<WelcomeSectionStory> = {
    component: WelcomeSectionStory,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/felixtjernberg.se-design?node-id=101%3A1370&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=101%3A1370&show-proto-sidebar=0"
        },
        layout: "fullscreen"
    },
    tags: ["docsPage"],
    title: "Compositions/Welcome Section"
}
export default meta

export const StoryNavigateToCoachSection: Story = {}
StoryNavigateToCoachSection.storyName = "Expect to navigate to each section programmatically when clicking the links"
StoryNavigateToCoachSection.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sections = ["coach", "phone", "contact", "computer"]
    const sectionIndicator = await canvas.getByTestId("navigation-indicator")
    for (const section of sections) {
        const sectionLink = await canvas.getByText(section)
        await userEvent.click(sectionLink)
        await expect(sectionIndicator.textContent).toBe(section)
    }
}

export const StoryRemoveFirstWordAndRecommendation: Story = {}
StoryRemoveFirstWordAndRecommendation.storyName = "Expect to remove the first word and the recommendation"
StoryRemoveFirstWordAndRecommendation.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const firstSentenceSpan = await canvas.getByTestId("first-sentence")
    const paragraph = await canvas.getByTestId("welcome-paragraph")
    const sectionLink = await canvas.getByText("coach")
    await expect(paragraph.children.length).toBe(2)
    await expect(firstSentenceSpan.textContent).toContain("first")
    await userEvent.click(sectionLink)
    await expect(firstSentenceSpan).not.toContain("first")
    await expect(firstSentenceSpan.textContent).toContain("now")
    await expect(paragraph.children.length).toBe(1)
}
