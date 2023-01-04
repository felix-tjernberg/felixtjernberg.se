import customViewports from "./customViewports"
import StorybookWrapper from "./StorybookWrapper.svelte"

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: {
        default: "Dark (#333)",
        values: [
            { name: "Light (#FFF)", value: "#FFF" },
            { name: "Light (--color-100)", value: "hsl(0, 0%, 98%)" },
            { name: "Dark (--color-100)", value: "hsl(0, 0%, 10%)" },
            { name: "Dark (#333)", value: "#333333" }
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
