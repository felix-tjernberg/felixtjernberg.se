import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import Counters from "./Counters.svelte"
import { expect } from "@storybook/jest"

type Story = StoryObj<Counters>

const meta: Meta<Counters> = {
    component: Counters,
    parameters: {
        docs: {
            description: {
                component: "A list of counter components"
            }
        }
    },
    tags: ["docsPage"],
    title: "Compositions/Counters"
}
export default meta

export const DefaultState: Story = {
    args: {
        buttonsInitialValues: [1, 2, 3]
    }
}

export const Story1: Story = {
    args: {
        buttonsInitialValues: [3, 2, 3]
    }
}
Story1.storyName = "Press the left button twice and middle button once"
Story1.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttonLeft = await canvas.getAllByText("count is 3")[0]
    const buttonMiddle = await canvas.getByText("count is 2")
    await userEvent.click(buttonLeft)
    await expect(buttonLeft.textContent).toBe("count is 4")
    await userEvent.click(buttonLeft)
    await expect(buttonLeft.textContent).toBe("count is 5")
    await userEvent.click(buttonMiddle)
    await expect(buttonMiddle.textContent).toBe("count is 3")
}
