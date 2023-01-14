import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import NavigationWrapperStory from "./NavigationWrapperStory.svelte"
import sleep from "$lib/stories/sleep"

type Story = StoryObj<NavigationWrapperStory>
export const DefaultState: Story = {}

const meta: Meta<NavigationWrapperStory> = {
    args: {},
    argTypes: {},
    component: NavigationWrapperStory,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/felixtjernberg.se-design?node-id=125%3A788&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=125%3A788&show-proto-sidebar=0"
        },
        layout: "fullscreen"
    },
    tags: ["docsPage"],
    title: "Compositions/Navigation Wrapper"
}
export default meta

export const StoryZoomIn: Story = {}
StoryZoomIn.storyName = "Expect clicking section zooms in to section"
StoryZoomIn.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)
    const navigationWrapper = await canvas.getByTestId("navigation-wrapper")
    const navigationLinks = await within(navigationWrapper).getAllByRole("link")
    for (const navigationLink of navigationLinks) {
        const linkText = navigationLink.textContent
        await userEvent.click(navigationLink)
        await expect(navigationWrapper).toHaveAttribute("data-active-section", linkText?.trim())
    }
}

export const StoryLinkRenderTest: Story = {}
StoryLinkRenderTest.storyName = "Links only render when navigation is active"
StoryLinkRenderTest.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)
    const navigationWrapper = await canvas.getByTestId("navigation-wrapper")
    const navigationLink = await within(navigationWrapper).getAllByRole("link")[0]
    await expect(navigationLink).toBeInTheDocument()
    userEvent.click(navigationLink)
    await sleep(1000)
    await expect(navigationLink).not.toBeInTheDocument()
}

export const StoryZoomOutProgrammatically: Story = {}
StoryZoomOutProgrammatically.storyName = "Zoom out programmatically using property"
StoryZoomOutProgrammatically.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)
    const navigationWrapper = await canvas.getByTestId("navigation-wrapper")
    const navigationLink = await within(navigationWrapper).getAllByRole("link")[0]
    const toggleNavigationButton = await canvas.getByTestId("toggle-navigation")
    await userEvent.click(navigationLink)
    expect(navigationWrapper).toHaveAttribute("data-active-section", "coach")
    await toggleNavigationButton.click()
    expect(navigationWrapper).toHaveAttribute("data-active-section", "none")
}

export const StorySwitchSectionProgrammatically: Story = {}
StorySwitchSectionProgrammatically.storyName = "Switch section programmatically using property"
StorySwitchSectionProgrammatically.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)
    const navigationWrapper = await canvas.getByTestId("navigation-wrapper")
    const switchSectionProgrammaticallyButton = await canvas.getByTestId("switch-section")
    await expect(navigationWrapper).toHaveAttribute("data-active-section", "none")
    await userEvent.click(switchSectionProgrammaticallyButton)
    sleep(1000)
    await expect(navigationWrapper).toHaveAttribute("data-active-section", "coach")
}
