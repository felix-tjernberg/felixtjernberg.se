import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import SettingsOverlayStory from "./SettingsOverlayStory.svelte"
import sleep from "$lib/stories/sleep"

type Story = StoryObj<SettingsOverlayStory>
export const DefaultState: Story = {}

const meta: Meta<SettingsOverlayStory> = {
    args: {},
    argTypes: {},
    component: SettingsOverlayStory,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/felixtjernberg.se-design?node-id=119%3A2145&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=119%3A2145&show-proto-sidebar=0"
        },
        layout: "fullscreen"
    },
    tags: ["docsPage"],
    title: "Compositions/Settings Overlay"
}
export default meta

export const StoryChangeVolumeStore: Story = {}
StoryChangeVolumeStore.storyName = "Test updating volume store"
StoryChangeVolumeStore.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const volumeSlider = await canvas.getByRole("range")
    const volumeStoreIndicator = await canvas.getByText("volume indicator: 0.5")
    await userEvent.click(volumeSlider)
    await expect(volumeStoreIndicator).toHaveTextContent("volume indicator: 0.6")
}

export const StoryIsElevatorMusicPlayingWhenChangingVolume: Story = {}
StoryIsElevatorMusicPlayingWhenChangingVolume.storyName = "Test if elevator music is playing when changing volume"
StoryIsElevatorMusicPlayingWhenChangingVolume.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const volumeSlider = await canvas.getByRole("range")
    const elevatorMusicIndicator = await canvas.getByText("elevator-music is playing: false")
    await userEvent.click(volumeSlider)
    await expect(elevatorMusicIndicator).toHaveTextContent("elevator-music is playing: true")
    sleep(3000)
    await expect(elevatorMusicIndicator).toHaveTextContent("elevator-music is playing: false")
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

export const StoryDeleteCookies: Story = {}
StoryDeleteCookies.storyName = "Test deleting cookies"
StoryDeleteCookies.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const deleteCookiesButton = await canvas.getByText("Delete cookies")
    await userEvent.click(deleteCookiesButton)
    const flickerSensitiveStoreIndicator = await canvas.getByText("flicker sensitive indicator: false")
    const themeStoreIndicator = await canvas.getByText("theme indicator: light")
    const eightBitStoreIndicator = await canvas.getByText("8bit indicator: false")
    const volumeStoreIndicator = await canvas.getByText("volume indicator: 0.5")
    const cookiesAllowedIndicator = await canvas.getByText("cookies allowed indicator: true")
    await expect(flickerSensitiveStoreIndicator).toHaveTextContent("flicker sensitive indicator: undefined")
    await expect(themeStoreIndicator).toHaveTextContent("theme indicator: undefined")
    await expect(eightBitStoreIndicator).toHaveTextContent("8bit indicator: undefined")
    await expect(volumeStoreIndicator).toHaveTextContent("volume indicator: undefined")
    await expect(cookiesAllowedIndicator).toHaveTextContent("cookies allowed: false")
}
