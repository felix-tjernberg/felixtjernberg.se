module.exports = {
    addons: [
        "@storybook/addon-a11y",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/jest",
        "@storybook/addon-interactions",
        "storybook-addon-designs"
    ],
    core: { disableTelemetry: true },
    docs: {
        autodocs: true
    },
    framework: { name: "@storybook/sveltekit" },
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"]
}
