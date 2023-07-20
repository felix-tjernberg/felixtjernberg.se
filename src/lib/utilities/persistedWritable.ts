import { browser } from "$app/environment"
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

    return {
        persistValue: async () => {
            window.localStorage[storageKey] = initialValue
            subscribe((value) => {
                window.localStorage[storageKey] = value
            })
        },
        set,
        subscribe,
        update,
    }
}
