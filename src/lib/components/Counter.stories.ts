import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import Counter from "./Counter.svelte"
import { expect } from "@storybook/jest"
import { withDesign } from "storybook-addon-designs"
type Story = StoryObj<Counter>

const meta: Meta<Counter> = {
    argTypes: { count: { control: { type: "number" } } },
    component: Counter,
    decorators: [withDesign],
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/design?node-id=1%3A859&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=1%3A859"
        },
        docs: { description: { component: "Button that increments and shows a counter" } },
        layout: "fullscreen"
    },
    tags: ["docsPage"],
    title: "Components/Counter"
}

export default meta

export const DefaultState: Story = {}

export const Story1: Story = {}
Story1.args = {
    count: -1
}
Story1.storyName = "Count is -1"
Story1.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    await expect(button.textContent).toBe("count is -1")
}

export const Story2: Story = {}
Story2.args = {
    count: undefined
}
Story2.storyName = "Count is undefined"
Story2.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    await expect(button.textContent).toBe("count is 0")
}

export const Story3: Story = {}
Story3.args = {
    //@ts-ignore // This is a chaos test
    count: "A string"
}
Story3.storyName = "Count is string"
Story3.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    await expect(button.textContent).toBe("count is 0")
}

export const Story4: Story = {}
Story4.args = {
    //@ts-ignore // This is a chaos test
    count: null
}
Story4.storyName = "Count is null"
Story4.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    await expect(button.textContent).toBe("count is 0")
}

export const Story5: Story = {}
Story5.args = {
    count: 0,
    decrement: true
}
Story5.storyName = "Decrement thrice"
Story5.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")

    for (let i = 1; i <= 3; i++) {
        await userEvent.click(button)
        await expect(button.textContent).toBe(`count is ${-i}`)
    }
}

export const Story6: Story = {}
Story6.args = {
    count: 0,
    decrement: true,
    step: 2
}
Story6.storyName = "Decrement with step of 2"
Story6.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    const stepSize = 2

    for (let i = 1; i <= 3; i++) {
        await userEvent.click(button)
        await expect(button.textContent).toBe(`count is ${-(i * stepSize)}`)
    }
}
export const Story7: Story = {}
Story7.args = {
    count: 0,
    decrement: true,
    step: 0
}
Story7.storyName = "Set decrement step to 0"
Story7.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    const stepSize = 1

    for (let i = 1; i <= 3; i++) {
        await userEvent.click(button)
        await expect(button.textContent).toBe(`count is ${-(i * stepSize)}`)
    }
}

const randomStep = Math.floor(Math.random() * 10)
export const Story8: Story = {}
Story8.args = {
    count: 0,
    decrement: true,
    step: randomStep
}
Story8.storyName = "Decrement with random step"
Story8.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")

    for (let i = 1; i <= 3; i++) {
        await userEvent.click(button)
        await expect(button.textContent).toBe(`count is ${-(i * randomStep)}`)
    }
}
