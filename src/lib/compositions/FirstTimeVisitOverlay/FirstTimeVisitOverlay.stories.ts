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
StoryAcceptCookies.storyName = "Test accepting cookies and see if local storage starts to update"
StoryAcceptCookies.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const acceptCookiesButton = await canvas.getByText("Allow essential cookies")
    const cookiesAllowedIndicator = await canvas.getByTestId("cookies-allowed-indicator")
    await userEvent.click(acceptCookiesButton)
    await expect(acceptCookiesButton).not.toBeInTheDocument()
    await expect(cookiesAllowedIndicator).toHaveTextContent("true")
    await expect(window.localStorage.getItem("cookiesAllowed")).toBe("true")
    await expect(window.localStorage.getItem("darkMode")).toBe("true")
    const darkModeButtonFalseButton = await within(canvas.getByTestId("dark-mode")).getAllByRole("button")[1]
    await userEvent.click(darkModeButtonFalseButton)
    await expect(window.localStorage.getItem("darkMode")).toBe("false")
}

export const StoryDeclineCookies: Story = {}
StoryDeclineCookies.storyName = "Test declining cookies and see if local storage does not update"
StoryDeclineCookies.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const declineCookiesButton = await canvas.getByText("Decline cookies")
    const cookiesAllowedIndicator = await canvas.getByTestId("cookies-allowed-indicator")
    await userEvent.click(declineCookiesButton)
    await expect(declineCookiesButton).not.toBeInTheDocument()
    await expect(cookiesAllowedIndicator).toHaveTextContent("false")
    const fetchAllowedCookiesFromLocalStorage = await window.localStorage.getItem("cookiesAllowed")
    await expect(fetchAllowedCookiesFromLocalStorage).toBe(null)
    const darkModeButtonFalseButton = await within(canvas.getByTestId("dark-mode")).getAllByRole("button")[1]
    await userEvent.click(darkModeButtonFalseButton)
    const fetchDarkModeFromLocalStorage = await window.localStorage.getItem("darkMode")
    await expect(fetchDarkModeFromLocalStorage).toBe(null)
}

export const StoryIsElevatorMusicPlaying: Story = {}
StoryIsElevatorMusicPlaying.storyName = "Test if elevator music is playing"
StoryIsElevatorMusicPlaying.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const elevatorMusicPlayingPausedIndicator = canvas.getByTestId("elevator-music-playing-indicator")
    await expect(elevatorMusicPlayingPausedIndicator).toHaveTextContent("undefined")
    const acceptCookiesButton = await canvas.getByText("Allow essential cookies")
    await userEvent.click(acceptCookiesButton)
    await expect(elevatorMusicPlayingPausedIndicator).toHaveTextContent("false")
    const closeOverlayButton = await canvas.getByTestId("close-first-time-visit-dialog")
    await userEvent.click(closeOverlayButton)
    await expect(elevatorMusicPlayingPausedIndicator).toHaveTextContent("true")
}

export const StoryUseBooleanButtons: Story = {}
StoryUseBooleanButtons.storyName = `Test updating eight bit text store`
StoryUseBooleanButtons.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = await within(canvasElement)
    const acceptCookiesButton = await canvas.getByText("Allow essential cookies")
    await userEvent.click(acceptCookiesButton)
    await sleep(420)
    const trueButton = await within(canvas.getByTestId(`dark-mode`)).getAllByRole("button")[0]
    const falseButton = await within(canvas.getByTestId(`dark-mode`)).getAllByRole("button")[1]
    const storeIndicator = await canvas.getByTestId(`dark-mode-indicator`)
    await userEvent.click(trueButton)
    await expect(storeIndicator).toHaveTextContent("true")
    await userEvent.click(falseButton)
    await expect(storeIndicator).toHaveTextContent("false")
}
