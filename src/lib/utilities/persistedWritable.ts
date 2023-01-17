// TODO Because I have not yet figured out how to run storybook against a sveltekit app, app/environment therefore not available
// import { browser } from "$app/environment"
const browser = true
import { writable } from "svelte/store"

export default function persistedWritable(storageKey: string, initialValue: unknown) {
    // This will first set the value of the writable to false during SSR, then on the first CSR the value will be set to the value from localStorage if it exists otherwise it will be set to the initialValue
    const storedValue = browser ? window.localStorage[storageKey] : false
    const { set, subscribe, update } = writable(browser ? (storedValue ? storedValue : initialValue) : false)

    if (browser && window.localStorage["cookiesAllowed"] === "true") {
        subscribe((value) => {
            window.localStorage[storageKey] = value
        })
    }

    return { persistValue: () => (window.localStorage[storageKey] = initialValue), set, subscribe, update }
}
