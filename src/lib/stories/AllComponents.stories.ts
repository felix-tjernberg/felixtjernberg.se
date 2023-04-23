import type { Meta, StoryObj } from "@storybook/svelte"
import AllComponents from "./AllComponents.svelte"

type Story = StoryObj<AllComponents>
export const DefaultState: Story = {}

const meta: Meta<AllComponents> = {
    component: AllComponents,
    parameters: {
        layout: "fullscreen"
    },
    title: "Compositions/All Components"
}
export default meta
