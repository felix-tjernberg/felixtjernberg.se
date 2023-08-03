import { type Actions, fail, redirect } from "@sveltejs/kit"
import { navigationStateKey, type NavigationStates, NavigationSchema } from "$stores/states/navigationState"
import { type AudioVolume, audioVolumeKey, audioVolumeSchema } from "$stores/settings/audioVolume"
import { EMAIL, PHONE_NUMBER } from "$env/static/private"
import { firstVisitKey, firstVisitNotificationKey } from "$stores/states/firstVisit"
import { formNameKey, valueKey } from "$utilities/globalKeys"
import { computerScreenIndexKey } from "$stores/states/computer"
import { cookiesAllowedKey } from "$stores/settings/cookiesAllowed"
import { darkModeKey } from "$stores/settings/darkMode"
import { likesEightBitFontKey } from "$stores/settings/likesEightBitFont"
import type { PageServerLoad } from "./$types"
import { scavengerHuntDoneKey } from "$stores/states/scavengerHuntDone"
import type { ZodSchema } from "zod"

type SettingsData = {
    [audioVolumeKey]: AudioVolume
    [darkModeKey]: boolean
    [likesEightBitFontKey]: boolean
}

type StatesData = {
    [navigationStateKey]: NavigationStates
    [computerScreenIndexKey]: number
    [firstVisitKey]: boolean
    [firstVisitNotificationKey]: boolean
    [scavengerHuntDoneKey]: boolean
}

type CookieStateTrue = {
    [cookiesAllowedKey]: true
}
type CookieStateFalse = {
    [cookiesAllowedKey]: false
}

//TODO not sure how to deal with this yet, point is to only send whis when user has finished scavenger hunt
type ScavangerHuntRewardData = { email: string; phoneNumber: string }

export type DataBasedOnCookies = CookieStateTrue & SettingsData & StatesData & ScavangerHuntRewardData
export type DataBasedOnDefaults = CookieStateFalse & SettingsData & StatesData

function getState<StateType>(schema: ZodSchema, state: string | undefined | null, fallbackState: StateType): StateType {
    if (state === undefined || state === null) return fallbackState
    const exctractedState = schema.safeParse(state)
    return exctractedState.success ? exctractedState.data : fallbackState
}

export const load = (async ({ cookies, params }) => {
    const route = NavigationSchema.safeParse(params.navigation)
    if (!route.success) throw fail(404, { error: "Page not found" })

    cookies.set(cookiesAllowedKey, "true")
    // cookies.getAll().forEach((cookie) => cookies.delete(cookie.name))

    // Return data state based on cookies
    const cookiesAllowed = cookies.get(cookiesAllowedKey) === "true"
    if (cookiesAllowed) {
        cookies.set(navigationStateKey, String(route.data), { httpOnly: false })
        return {
            [navigationStateKey]: route.data,
            [audioVolumeKey]: getState<AudioVolume>(audioVolumeSchema, cookies.get(audioVolumeKey), 0.1),
            [computerScreenIndexKey]: getState<number>(audioVolumeSchema, cookies.get(computerScreenIndexKey), 0),
            [cookiesAllowedKey]: true,
            [darkModeKey]: cookies.get(darkModeKey) === "false",
            email: EMAIL,
            [firstVisitKey]: !(cookies.get(firstVisitKey) === "false"),
            [firstVisitNotificationKey]: !(cookies.get(firstVisitNotificationKey) === "true"),
            [likesEightBitFontKey]: cookies.get(likesEightBitFontKey) === "true",
            phoneNumber: PHONE_NUMBER,
            [scavengerHuntDoneKey]: cookies.get(scavengerHuntDoneKey) === "true",
        } satisfies DataBasedOnCookies
    }

    // Default data state of the application
    return {
        [navigationStateKey]: NavigationSchema.enum.computer,
        [audioVolumeKey]: 0.1,
        [computerScreenIndexKey]: 0,
        [cookiesAllowedKey]: false,
        [darkModeKey]: true,
        [firstVisitKey]: true,
        [firstVisitNotificationKey]: true,
        [likesEightBitFontKey]: true,
        [scavengerHuntDoneKey]: false,
    } satisfies DataBasedOnDefaults
}) satisfies PageServerLoad

export const actions = {
    allowCookies: async ({ cookies }) => {
        cookies.set(cookiesAllowedKey, "true")
        throw redirect(302, "/")
    },
    removeCookies: async ({ cookies }) => {
        cookies.getAll().forEach((cookie) => cookies.delete(cookie.name))
        throw redirect(302, "/")
    },
    toggleBoolean: async ({ cookies, request }) => {
        if (cookies.get(cookiesAllowedKey) === "true") {
            const formData = await request.formData()

            const key = formData.get(formNameKey)
            const boolean = formData.get(valueKey) === "true"

            if (key === null) return fail(400, { error: "No formName key supplied" })

            cookies.set(String(key), String(boolean), { httpOnly: false })

            throw redirect(302, "/")
        }

        return fail(400, { error: "Cookies not allowed" })
    },
} satisfies Actions
