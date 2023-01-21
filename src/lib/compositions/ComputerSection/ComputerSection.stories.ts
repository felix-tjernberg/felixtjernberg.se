import type { Meta, StoryObj } from "@storybook/svelte"
import { userEvent, within } from "@storybook/testing-library"
import ComputerSectionStory from "./ComputerSectionStory.svelte"
import { expect } from "@storybook/jest"

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

export const StoryScavengerHunt: Story = {}
StoryScavengerHunt.name = "Test Scavenger Hunt"
StoryScavengerHunt.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement)

    const pinInputs = await canvas.getAllByTestId("pin-input")
    for (let i = 0; i < pinInputs.length; i++) {
        const pinInput = await pinInputs[i]
        await userEvent.type(pinInput, `${i}`)
    }
    await expect(pinInputs).not.toBeInTheDocument()

    const initializeMessage = await canvas.getByText("Initializing...")
    const skipInitializeNoise = await canvas.getByTestId("skip-initialize-noise")
    const initializeNoisePlayingIndicator = await canvas.getByTestId("initialize-noise-playing-indicator")
    await expect(initializeMessage).toBeInTheDocument()
    await expect(initializeNoisePlayingIndicator.textContent).toBe("true")
    await userEvent.click(skipInitializeNoise)
    await expect(initializeMessage).not.toBeInTheDocument()

    const startScavengerHuntTextInput = await canvas.getByTestId("start-scavenger-hunt-text-input")
    await userEvent.type(startScavengerHuntTextInput, "yes")
    await expect(startScavengerHuntTextInput).not.toBeInTheDocument()

    const songNumberInput = await canvas.getByTestId("song-number-input")
    await userEvent.type(songNumberInput, "1337")
    await expect(songNumberInput).not.toBeInTheDocument()

    const coachYearsNumberInput = await canvas.getByTestId("coach-years-number-input")
    await userEvent.type(coachYearsNumberInput, "3")
    await expect(coachYearsNumberInput).not.toBeInTheDocument()

    //TODO add remaining questions tests (they are not known yet)

    const momCallingNotification = await canvas.getByTestId("mom-calling-notification")
    const sectionIndicator = await canvas.getByTestId("section-indicator")
    const mgMomNeedsInput = await canvas.getByTestId("mg-mom-needs-input")
    await userEvent.click(within(momCallingNotification).getByRole("link"))
    await expect(sectionIndicator).toHaveTextContent("phone")
    await userEvent.type(mgMomNeedsInput, "200")
    await expect(mgMomNeedsInput).not.toBeInTheDocument()

    const scavengerHuntDoneNotification = await canvas.getByTestId("scavenger-hunt-done-notification")
    const contactSectionLink = await canvas.getByTestId("contact-section-link")
    await expect(scavengerHuntDoneNotification).toBeInTheDocument()
    await expect(contactSectionLink).toBeInTheDocument()
}
