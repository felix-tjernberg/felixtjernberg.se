import type { Meta, StoryObj } from "@storybook/svelte"
import AllComponents from "./AllComponents.svelte"

type Story = StoryObj<AllComponents>
export const DefaultState: Story = {}

const meta: Meta<AllComponents> = {
    component: AllComponents,
    parameters: {
        layout: "fullscreen"
    },
    tags: ["docsPage"],
    title: "Compositions/All Components"
}
export default meta
