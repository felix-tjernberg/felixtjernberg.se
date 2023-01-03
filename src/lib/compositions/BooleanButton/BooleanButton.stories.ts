import { expect, jest } from "@storybook/jest"
import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import BooleanButtonStory from "./BooleanButtonStory.svelte"

type Story = StoryObj<BooleanButtonStory>
export const DefaultState: Story = {}

const meta: Meta<BooleanButtonStory> = {
    argTypes: {
        booleanTest: { table: { disable: true } },
        description: { control: "text" }
    },
    component: BooleanButtonStory,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/design?node-id=17%3A118&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=17%3A118&show-proto-sidebar=0"
        }
    },
    tags: ["docsPage"],
    title: "Compositions/BooleanButton"
}
export default meta

const StoryLabelsArray = ["On", "Off"]
export const StoryLabels: Story = {}
StoryLabels.args = {
    labels: StoryLabelsArray
}
StoryLabels.storyName = "Expect labels to be rendered"
StoryLabels.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)
    const buttons = await canvas.getAllByRole("button")
    await buttons.forEach(async (button, index) => {
        await expect(button.textContent).toBe(StoryLabelsArray[index])
    })
}

const StoryDescriptionString = "Hello I describe what this button does"
export const StoryDescription: Story = {}
StoryDescription.args = {
    description: StoryDescriptionString,
    labels: StoryLabelsArray
}
StoryDescription.storyName = "Expect description to be rendered"
StoryDescription.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)
    const description = await canvas.getByText(StoryDescriptionString)
    await expect(description).toBeTruthy()
}

export const StoryToggleBoolean: Story = {}
StoryToggleBoolean.args = {
    booleanTest: true,
    labels: StoryLabelsArray
}
StoryToggleBoolean.storyName = "Expect boolean to update when clicking buttons"
StoryToggleBoolean.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)
    const trueButton = await canvas.getByText(StoryLabelsArray[0])
    const falseButton = await canvas.getByText(StoryLabelsArray[1])
    const booleanValueElement = await canvas.getByText("true")
    await expect(booleanValueElement.textContent).toBe("true")
    await userEvent.click(trueButton)
    await expect(booleanValueElement.textContent).toBe("true")
    await userEvent.click(falseButton)
    await expect(booleanValueElement.textContent).toBe("false")
    await userEvent.click(falseButton)
    await expect(booleanValueElement.textContent).toBe("false")
    await userEvent.click(trueButton)
    await expect(booleanValueElement.textContent).toBe("true")
}

export const StoryAciveButtonAlwaysWhiteBackground: Story = {}
StoryAciveButtonAlwaysWhiteBackground.args = {
    booleanTest: true,
    labels: StoryLabelsArray
}
StoryAciveButtonAlwaysWhiteBackground.storyName = "Expect active button to have white background"
StoryAciveButtonAlwaysWhiteBackground.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)
    const onButton = await canvas.getByText(StoryLabelsArray[0])
    const offButton = await canvas.getByText(StoryLabelsArray[1])
    await userEvent.click(onButton)
    await expect(onButton).toHaveStyle("background-color: white")
    await userEvent.click(offButton)
    await expect(offButton).toHaveStyle("background-color: white")
}
