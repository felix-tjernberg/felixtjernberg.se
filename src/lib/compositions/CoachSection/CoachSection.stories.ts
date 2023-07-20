import type { Meta, StoryObj } from "@storybook/svelte"
import CoachSectionStory from "./CoachSectionStory.svelte"

type Story = StoryObj<CoachSectionStory>
export const DefaultState: Story = {}

const meta: Meta<CoachSectionStory> = {
    args: {},
    argTypes: {},
    component: CoachSectionStory,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/felixtjernberg.se-design?node-id=119%3A2147&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=119%3A2147&show-proto-sidebar=0",
        },
        layout: "fullscreen",
    },
    title: "Compositions/Coach Section",
}
export default meta
