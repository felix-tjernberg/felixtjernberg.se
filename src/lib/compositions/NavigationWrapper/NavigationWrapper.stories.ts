import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import NavigationWrapperStory from "./NavigationWrapperStory.svelte"

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

export const StoryLinkRenderTest: Story = {}
StoryLinkRenderTest.storyName = "Links only render when navigation is active"

export const StoryZoomOutProgrammatically: Story = {
    active: false
}
StoryZoomOutProgrammatically.storyName = "Zoom out programmatically using property"

export const StorySwitchSectionProgrammatically: Story = {
    active: false
}
StorySwitchSectionProgrammatically.storyName = "Switch section programmatically using property"
