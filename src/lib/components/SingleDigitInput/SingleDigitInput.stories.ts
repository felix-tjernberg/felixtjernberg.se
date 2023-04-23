import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import SingleDigitInput from "./SingleDigitInput.svelte"

type Story = StoryObj<SingleDigitInput>
export const DefaultState: Story = {}

const meta: Meta<SingleDigitInput> = {
    argTypes: {
        label: { table: { disable: true } }
    },
    component: SingleDigitInput,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/felixtjernberg.se-design?node-id=28%3A333&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=28%3A333&show-proto-sidebar=0"
        }
    },
    title: "Components/Single Digit Input"
}
export default meta

export const StoryPressUpAndDown10Times: Story = {}
StoryPressUpAndDown10Times.storyName = "Press up and down 10 times"
StoryPressUpAndDown10Times.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)
    const input = (await canvas.getByRole("spinbutton")) as HTMLInputElement
    const increaseButton = (await canvas.getByTestId("increase-button")) as HTMLButtonElement
    const decreaseButton = (await canvas.getByTestId("decrease-button")) as HTMLButtonElement

    for (let i = 1; i <= 10; i++) {
        await userEvent.click(increaseButton)
        if (i === 10) {
            await expect(input.value).toBe("0")
            break
        }
        await expect(input.value).toBe(i.toString())
    }
    for (let i = 9; i >= 0; i--) {
        await userEvent.click(decreaseButton)
        if (i === 10) {
            await expect(input.value).toBe("0")
            break
        }
        await expect(input.value).toBe(i.toString())
    }
}

export const StoryValuePropertyIsNaN: Story = {}
StoryValuePropertyIsNaN.storyName = 'Expect value property to be "" if not a number'
StoryValuePropertyIsNaN.args = {
    value: NaN
}
StoryValuePropertyIsNaN.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)
    const input = await canvas.getByRole("spinbutton")
    await expect(input.textContent).toBe("")
}
