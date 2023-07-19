import type { StorybookConfig } from "@storybook/sveltekit"
const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-a11y",
        "@storybook/addon-links",
        "@storybook/jest",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "storybook-addon-designs"
    ],
    core: { disableTelemetry: true },
    docs: { autodocs: true },
    framework: { name: "@storybook/sveltekit", options: {} }
}
export default config
