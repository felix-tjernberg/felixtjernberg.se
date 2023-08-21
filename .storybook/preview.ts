import type { Preview } from "@storybook/svelte"
import StorybookWrapper from "./StorybookWrapper.svelte"
import customViewports from "./customViewports"

export default {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        backgrounds: {
            default: "DarkMode",
            values: [
                { name: "LightMode", value: "transparent transparent" },
                { name: "Light (#FFF)", value: "#FFF" },
                { name: "Dark (#333)", value: "#333333" },
                { name: "DarkMode", value: "transparent" },
            ],
        },
        controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
        layout: "centered",
        options: { storySort: { order: ["Design System", "Pages", "Compositions", "Components", "Utilities"] } },
        viewport: customViewports,
    },
} satisfies Preview

export const decorators = [
    (_, story) => ({
        Component: StorybookWrapper,
        props: { context: story.globals },
    }),
]

export const globalTypes = {
    starField: {
        defaultValue: "On",
        toolbar: {
            items: ["On", "Off"],
            title: "Starfield Background",
        },
    },
}
