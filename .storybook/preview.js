import customViewports from "./customViewports"
import StorybookWrapper from "./StorybookWrapper.svelte"

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: {
        default: "DarkMode",
        values: [
            { name: "LightMode", value: "transparent transparent" },
            { name: "Light (#FFF)", value: "#FFF" },
            { name: "Dark (#333)", value: "#333333" },
            { name: "DarkMode", value: "transparent" }
        ]
    },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    layout: "centered",
    options: { storySort: { order: ["Design System", "Pages", "Compositions", "Components"] } },
    viewport: customViewports
}

export const decorators = [
    (_, story) => ({
        Component: StorybookWrapper,
        props: { context: story.globals }
    })
]

export const globalTypes = {
    starField: {
        name: "Starfield Background",
        defaultValue: "On",
        toolbar: {
            items: ["On", "Off"],
            name: true
        }
    }
}
