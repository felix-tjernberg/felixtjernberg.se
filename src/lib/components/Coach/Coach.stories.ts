import type { Meta, StoryObj } from "@storybook/svelte"
import Coach from "./Coach.svelte"

type Story = StoryObj<Coach>
export const DefaultState: Story = {}

const meta: Meta<Coach> = {
    component: Coach,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/felixtjernberg.se-design?node-id=40%3A764&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=40%3A764&show-proto-sidebar=0"
        },
        layout: "fullscreen"
    },
    tags: ["docsPage"],
    title: "Components/Coach"
}
export default meta
