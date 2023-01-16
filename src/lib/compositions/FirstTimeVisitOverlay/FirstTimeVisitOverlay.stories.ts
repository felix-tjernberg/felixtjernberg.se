import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import FirstTimeVisitOverlayStory from "./FirstTimeVisitOverlayStory.svelte"
import sleep from "$lib/stories/sleep"

type Story = StoryObj<FirstTimeVisitOverlayStory>
export const DefaultState: Story = {}

const meta: Meta<FirstTimeVisitOverlayStory> = {
    component: FirstTimeVisitOverlayStory,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/felixtjernberg.se-design?node-id=119%3A2118&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=119%3A2118&show-proto-sidebar=0"
        },
        layout: "fullscreen"
    },
    tags: ["docsPage"],
    title: "Compositions/First Time Visit Overlay"
}
export default meta

export const StoryAcceptCookies: Story = {}
StoryAcceptCookies.storyName = "Test accepting cookies"
StoryAcceptCookies.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const acceptCookiesButton = await canvas.getByText("Accept essential cookies")
    const cookiesAllowedIndicator = await canvas.getByTestId("cookies-allowed-indicator")
    await userEvent.click(acceptCookiesButton)
    await sleep(1000)
    await expect(acceptCookiesButton).not.toBeInTheDocument()
    await expect(cookiesAllowedIndicator).toHaveTextContent("cookies allowed: true")
}

export const StoryDeclineCookies: Story = {}
StoryDeclineCookies.storyName = "Test declining cookies"
StoryDeclineCookies.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const acceptCookiesButton = await canvas.getByText("Decline cookies")
    const cookiesAllowedIndicator = await canvas.getByTestId("cookies-allowed-indicator")
    await userEvent.click(acceptCookiesButton)
    await sleep(1000)
    await expect(acceptCookiesButton).not.toBeInTheDocument()
    await expect(cookiesAllowedIndicator).toHaveTextContent("cookies allowed: true")
}

export const StoryChangeVolumeStore: Story = {}
StoryChangeVolumeStore.storyName = "Test updating volume store"
StoryChangeVolumeStore.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const volumeSlider = await canvas.getByRole("range")
    const volumeStoreIndicator = await canvas.getByTestId("volume-store-indicator")
    await userEvent.click(volumeSlider)
    await expect(volumeStoreIndicator).toHaveTextContent("volume indicator: 0.1")
}

export const StoryIsElevatorMusicPlaying: Story = {}
StoryIsElevatorMusicPlaying.storyName = "Test if elevator music is playing"
StoryIsElevatorMusicPlaying.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const elevatorMusicPlayingIndicator = canvas.getByText("elevator-music is playing: false")
    await expect(elevatorMusicPlayingIndicator).toHaveTextContent("elevator music playing: true")
}

export const StoryUseBooleanButtons: Story = {}
StoryUseBooleanButtons.storyName = `Test updating eight bit text store`
StoryUseBooleanButtons.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const testIds = ["eight-bit-text", "flicker-sensitive", "dark-mode"]
    await sleep(420)
    for (const id of testIds) {
        const trueButton = await canvas.getByTestId(`${id}-true`)
        const falseButton = await canvas.getByTestId(`${id}-false`)
        const storeIndicator = await canvas.getByTestId(`${id}-store-indicator`)
        await userEvent.click(trueButton)
        await expect(storeIndicator).toHaveTextContent("true")
        await userEvent.click(falseButton)
        await expect(storeIndicator).toHaveTextContent("false")
    }
}
