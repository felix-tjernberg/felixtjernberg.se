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
    const settingsWrapper = await canvas.getByTestId("settings-wrapper")
    const volumeSlider = await within(settingsWrapper).getByRole("range")
    const volumeStoreIndicator = await within(settingsWrapper).getByText("volume indicator: 0.5")
    await userEvent.click(volumeSlider)
    await expect(volumeStoreIndicator).toHaveTextContent("volume indicator: 0.6")
}

export const StoryIsElevatorMusicPlayingWhenChangingVolume: Story = {}
StoryIsElevatorMusicPlayingWhenChangingVolume.storyName = "Test if elevator music is playing when changing volume"
StoryIsElevatorMusicPlayingWhenChangingVolume.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const settingsWrapper = await canvas.getByTestId("settings-wrapper")
    const volumeSlider = await within(settingsWrapper).getByRole("range")
    const elevatorMusicIndicator = await within(settingsWrapper).getByText("elevator-music is playing: false")
    await userEvent.click(volumeSlider)
    await expect(elevatorMusicIndicator).toHaveTextContent("elevator-music is playing: true")
    sleep(3000)
    await expect(elevatorMusicIndicator).toHaveTextContent("elevator-music is playing: false")
}

export const StoryChange8bitStore: Story = {}
StoryChangeVolumeStore.storyName = "Test updating 8bit store"
StoryChangeVolumeStore.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const settingsWrapper = await canvas.getByTestId("settings-wrapper")
    const eightBitToggle = await within(settingsWrapper).getByText("Do you like 8bit text?")
    const eightBitStoreIndicator = await within(settingsWrapper).getByText("8bit indicator: false")
    await userEvent.click(eightBitToggle.parentElement)
    await expect(eightBitStoreIndicator).toHaveTextContent("8bit indicator: true")
}

export const StoryChangeThemeStore: Story = {}
StoryChangeThemeStore.storyName = "Test updating theme store"
StoryChangeThemeStore.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const settingsWrapper = await canvas.getByTestId("settings-wrapper")
    const themeToggle = await within(settingsWrapper).getByText("Do you like dark mode?")
    const themeStoreIndicator = await within(settingsWrapper).getByText("theme indicator: light")
    await userEvent.click(themeToggle.parentElement)
    await expect(themeStoreIndicator).toHaveTextContent("theme indicator: dark")
}

export const StoryChangeFlickerSensitiveStore: Story = {}
StoryChangeFlickerSensitiveStore.storyName = "Test updating flicker sensitive store"
StoryChangeFlickerSensitiveStore.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const settingsWrapper = await canvas.getByTestId("settings-wrapper")
    const flickerSensitiveToggle = await within(settingsWrapper).getByText("Are you flicker sensitive?")
    const flickerSensitiveStoreIndicator = await within(settingsWrapper).getByText("flicker sensitive indicator: false")
    await userEvent.click(flickerSensitiveToggle.parentElement)
    await expect(flickerSensitiveStoreIndicator).toHaveTextContent("flicker sensitive indicator: true")
}

export const StoryDeleteCookies: Story = {}
StoryDeleteCookies.storyName = "Test deleting cookies"
StoryDeleteCookies.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const settingsWrapper = await canvas.getByTestId("settings-wrapper")
    const deleteCookiesButton = await within(settingsWrapper).getByText("Delete cookies")
    await userEvent.click(deleteCookiesButton.parentElement)
    const flickerSensitiveStoreIndicator = await within(settingsWrapper).getByText("flicker sensitive indicator: false")
    const themeStoreIndicator = await within(settingsWrapper).getByText("theme indicator: light")
    const eightBitStoreIndicator = await within(settingsWrapper).getByText("8bit indicator: false")
    const volumeStoreIndicator = await within(settingsWrapper).getByText("volume indicator: 0.5")
    const cookiesAllowedIndicator = await within(settingsWrapper).getByText("cookies allowed indicator: true")
    await expect(flickerSensitiveStoreIndicator).toHaveTextContent("flicker sensitive indicator: undefined")
    await expect(themeStoreIndicator).toHaveTextContent("theme indicator: undefined")
    await expect(eightBitStoreIndicator).toHaveTextContent("8bit indicator: undefined")
    await expect(volumeStoreIndicator).toHaveTextContent("volume indicator: undefined")
    await expect(volumeStoreIndicator).toHaveTextContent("cookies allowed: false")
}
