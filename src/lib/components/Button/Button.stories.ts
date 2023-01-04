import { expect, jest } from "@storybook/jest"
import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import ButtonStory from "./ButtonStory.svelte"
import { FUNCTION_TEST_STRING } from "./FUNCTION_TEST_STRING"

type Story = StoryObj<ButtonStory>
export const DefaultState: Story = {}

const meta: Meta<ButtonStory> = {
    argTypes: {
        classTest: { table: { disable: true } },
        functionTest: { table: { disable: true } },
        iconTest: { table: { disable: true } }
    },
    component: ButtonStory,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/design?node-id=15%3A109&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=15%3A109&show-proto-sidebar=0"
        }
    },
    tags: ["docsPage"],
    title: "Components/Button"
}
export default meta

const StoryUnderlinedString = "I'm underlined :)"
export const StoryUnderlined: Story = {}
StoryUnderlined.args = {
    label: StoryUnderlinedString,
    underlined: true
}
StoryUnderlined.storyName = "Underlined variant"

export const StoryIconVariant: Story = {}
StoryIconVariant.args = {
    iconTest: true,
    label: "settings"
}
StoryIconVariant.parameters = {
    design: {
        type: "figma",
        url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/design?node-id=37%3A412&starting-point-node-id=37%3A412&show-proto-sidebar=0"
    }
}
StoryIconVariant.storyName = "Icon variant"

const StoryLabelString = "Hello world!"
export const StoryLabel: Story = {}
StoryLabel.args = {
    label: StoryLabelString
}
StoryLabel.storyName = "Expect label to be rendered"
StoryLabel.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)
    const button = await canvas.getByRole("button")
    await expect(button.textContent).toBe(StoryLabelString)
}

export const StoryOnClick: Story = {}
StoryOnClick.args = {
    functionTest: true,
    label: "test on:click"
}
StoryOnClick.storyName = "Expect on:click event forwarding"
StoryOnClick.play = async ({ canvasElement }) => {
    console.log = jest.fn()
    const canvas = within(canvasElement)
    const button = await canvas.getByRole("button")
    await userEvent.click(button)
    await expect(console.log).toHaveBeenCalledWith(FUNCTION_TEST_STRING)
}

export const Story$$PropsClass: Story = {}
Story$$PropsClass.args = {
    classTest: true,
    label: "$$props.class"
}
Story$$PropsClass.storyName = "Expect $$props.class overide"
Story$$PropsClass.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.getByTestId("class-test").children[0]
    await expect(button).toHaveClass("background-blur-500")
}

export const StoryDarkMode: Story = {}
StoryDarkMode.args = {
    label: "Dark/Light mode"
}
StoryDarkMode.storyName = "Test dark/light mode"
StoryDarkMode.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.getByRole("button")
    const dataDarkModeElement = await canvas.getByTestId("storybook-wrapper")
    await (dataDarkModeElement.dataset.darkMode = "false")
    await expect(button).toHaveStyle({ backgroundColor: { a: 90, b: 0, g: 0, r: 0 } })
    await (dataDarkModeElement.dataset.darkMode = "true")
    await expect(button).toHaveStyle({ backgroundColor: { a: 10, b: 0, g: 0, r: 0 } })
}
