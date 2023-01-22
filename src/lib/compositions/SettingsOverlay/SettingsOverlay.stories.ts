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

// export const StoryChangeVolumeStore: Story = {}
// StoryChangeVolumeStore.storyName = "Test updating volume store"
// StoryChangeVolumeStore.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
//     const canvas = await within(canvasElement)
//     const openSettingsButton = await canvas.getByRole("button")
//     await userEvent.click(openSettingsButton)
//     const volumeSlider = (await canvas.getByRole("slider")) as HTMLInputElement
//     await volumeSlider.focus()
//     const volumeStoreIndicator = await canvas.getByTestId("volume-indicator")
//     await expect(volumeStoreIndicator).toHaveTextContent("volume indicator: 0.5")
// }

// export const StoryIsElevatorMusicPlayingWhenChangingVolume: Story = {}
// StoryIsElevatorMusicPlayingWhenChangingVolume.storyName = "Test if elevator music is playing when changing volume"
// StoryIsElevatorMusicPlayingWhenChangingVolume.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
//     const canvas = await within(canvasElement)
//     const volumeSlider = await canvas.getByRole("range")
//     const elevatorMusicIndicator = await canvas.getByText("elevator-music is playing: false")
//     await userEvent.click(volumeSlider)
//     await expect(elevatorMusicIndicator).toHaveTextContent("elevator-music is playing: true")
//     sleep(3000)
//     await expect(elevatorMusicIndicator).toHaveTextContent("elevator-music is playing: false")
// }

export const StoryUseBooleanButtons: Story = {}
StoryUseBooleanButtons.storyName = `Test updating eight bit text store`
StoryUseBooleanButtons.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const openSettingsButton = await canvas.getByRole("button")
    await userEvent.click(openSettingsButton)
    const testIds = ["likes-eight-bit-font", "dark-mode"]
    await sleep(420)
    for (const id of testIds) {
        const trueButton = await within(canvas.getByTestId(`${id}`)).getAllByRole("button")[0]
        const falseButton = await within(canvas.getByTestId(`${id}`)).getAllByRole("button")[1]
        const storeIndicator = await canvas.getByTestId(`${id}-indicator`)
        await userEvent.click(trueButton)
        await expect(storeIndicator).toHaveTextContent("true")
        await userEvent.click(falseButton)
        await expect(storeIndicator).toHaveTextContent("false")
    }
}

export const StoryDeleteCookies: Story = {}
StoryDeleteCookies.storyName = "Test enabling/disable cookies / restart scavenger hunt and close settings overlay"
StoryDeleteCookies.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const openSettingsButton = await canvas.getByRole("button")
    const cookiesIndicator = await canvas.getByTestId("cookies-allowed-indicator")
    const scavengerHunterIndicator = await canvas.getByTestId("scavenger-hunt-done-indicator")
    const dialog = await canvas.getByTestId("settings-dialog")
    await userEvent.click(openSettingsButton)
    const deleteCookiesButton = await canvas.getByTestId("cookies-allowed-false")
    await userEvent.click(deleteCookiesButton)
    await expect(cookiesIndicator).toHaveTextContent("false")
    const enableCookiesButton = await canvas.getByTestId("cookies-allowed-true")
    await userEvent.click(enableCookiesButton)
    await expect(cookiesIndicator).toHaveTextContent("true")
    await expect(scavengerHunterIndicator).toHaveTextContent("true")
    const resetScavengeHuntButton = await canvas.getByTestId("reset-scavenger-hunt")
    await userEvent.click(resetScavengeHuntButton)
    await expect(scavengerHunterIndicator).toHaveTextContent("false")
    const closeSettingsButton = await canvas.getByTestId("close-settings")
    await expect(dialog).toHaveAttribute("open", "")
    await userEvent.click(closeSettingsButton)
    await expect(dialog).not.toHaveAttribute("open", "")
}
