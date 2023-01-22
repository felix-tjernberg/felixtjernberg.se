import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import ComputerSectionStory from "./ComputerSectionStory.svelte"
import { expect } from "@storybook/jest"
import sleep from "$lib/stories/sleep"

type Story = StoryObj<ComputerSectionStory>
export const DefaultState: Story = {}

const meta: Meta<ComputerSectionStory> = {
    args: {},
    argTypes: {},
    component: ComputerSectionStory,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/G88PsAAI0rDAWmJ1VY6rbJ/felixtjernberg.se-design?node-id=119%3A2144&scaling=min-zoom&page-id=11%3A864&starting-point-node-id=119%3A2144&show-proto-sidebar=0"
        },
        layout: "fullscreen"
    },
    tags: ["docsPage"],
    title: "Compositions/Computer Section"
}
export default meta

export const StoryFirstScreen: Story = {}
StoryFirstScreen.storyName = "First screen"
StoryFirstScreen.args = { screenIndex: 0 }

export const StorySecondScreen: Story = {}
StorySecondScreen.storyName = "Second screen"
StorySecondScreen.args = { screenIndex: 1 }

export const StoryThirdScreen: Story = {}
StoryThirdScreen.storyName = "Third screen"
StoryThirdScreen.args = { screenIndex: 2 }

export const StoryFourthScreen: Story = {}
StoryFourthScreen.storyName = "Fourth screen"
StoryFourthScreen.args = { screenIndex: 3 }

export const StoryFifthScreen: Story = {}
StoryFifthScreen.storyName = "Fifth screen"
StoryFifthScreen.args = { screenIndex: 4 }

export const StorySixthScreen: Story = {}
StorySixthScreen.storyName = "Sixth screen"
StorySixthScreen.args = { screenIndex: 5 }

export const StorySeventhScreen: Story = {}
StorySeventhScreen.storyName = "Seventh screen"
StorySeventhScreen.args = { screenIndex: 6 }

export const StoryScavengerHunt: Story = {}
StoryScavengerHunt.storyName = "Test Scavenger Hunt"
StoryScavengerHunt.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)

    const clueNote = await canvas.getByTestId("clue-note")
    await userEvent.click(within(clueNote).getByRole("button"))
    await sleep(5200)
    const clueNotification = await canvas.getByTestId("clue-notification")
    await expect(clueNotification).toBeInTheDocument()

    const pinInputs = await canvas.getAllByTestId("pin-input")
    for (let i = 0; i < pinInputs.length; i++) {
        const pinInput = await pinInputs[i]
        await userEvent.type(pinInput, `${i + 1}`)
    }
    await sleep(100)
    await expect(pinInputs[0]).not.toBeInTheDocument()

    const skipInitializeNoise = await canvas.getByTestId("skip-init-screen")
    const initializeNoisePlayingIndicator = await canvas.getByTestId("initialize-noise-playing-indicator")
    await expect(initializeNoisePlayingIndicator.textContent).toContain("false")
    await userEvent.click(skipInitializeNoise)

    const startScavengerHuntTextInput = await canvas.getByTestId("start-scavenger-hunt-text-input")
    await userEvent.type(startScavengerHuntTextInput, "yes")
    await sleep(100)
    await expect(startScavengerHuntTextInput).not.toBeInTheDocument()

    const songNumberInput = await canvas.getByTestId("song-number-input")
    await userEvent.type(songNumberInput, "185")
    await sleep(100)
    await expect(songNumberInput).not.toBeInTheDocument()

    const coachYearsNumberInput = await canvas.getByTestId("coach-years-number-input")
    await userEvent.type(coachYearsNumberInput, "3")
    await sleep(100)
    await expect(coachYearsNumberInput).not.toBeInTheDocument()

    //TODO add remaining questions tests (they are not known yet)

    const momCallingNotification = await canvas.getByTestId("mom-calling-notification")
    const sectionIndicator = await canvas.getByTestId("active-section-indicator")
    const mgMomNeedsInput = await canvas.getByTestId("mg-mom-needs-input")
    await expect(sectionIndicator.textContent).toContain("computer")
    await userEvent.click(within(momCallingNotification).getByRole("link"))
    await expect(sectionIndicator.textContent).toContain("phone")
    await userEvent.type(mgMomNeedsInput, "200")
    await sleep(100)
    await expect(mgMomNeedsInput).not.toBeInTheDocument()

    const scavengerHuntDoneNotification = await canvas.getByTestId("hunt-done-notification")
    const contactSectionLink = await canvas.getByTestId("contact-section-link")
    await expect(scavengerHuntDoneNotification).toBeInTheDocument()
    await expect(contactSectionLink).toBeInTheDocument()
}
