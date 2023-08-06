import { type Actions, fail, redirect } from "@sveltejs/kit"
import { type AudioVolume, audioVolumeKey, audioVolumeSchema } from "$stores/settings/audioVolume"
import { booleanNameKey, valueKey } from "$utilities/toggleBooleanKeys"
import { type ComputerScreenIndex, computerScreenIndexKey, computerScreenIndexSchema } from "$stores/states/computer"
import { cookiesAllowedKey, decidedOnCookiesKey } from "$stores/settings/cookiesAllowed"
import { EMAIL, PHONE_NUMBER } from "$env/static/private"
import {
    navigationExplainer2Key,
    navigationExplainerKey,
    NavigationSchema,
    navigationStateKey,
    type NavigationStates,
} from "$stores/states/navigation"
import { darkModeKey } from "$stores/settings/darkMode"
import { firstVisitKey } from "$stores/states/firstVisit"
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
    [computerScreenIndexKey]: number
    [decidedOnCookiesKey]: boolean
    [firstVisitKey]: boolean
    [navigationStateKey]: NavigationStates
    [scavengerHuntDoneKey]: boolean
    [navigationExplainer2Key]: boolean
    [navigationExplainerKey]: boolean
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
export type DataBasedOnParameters = CookieStateFalse & SettingsData & StatesData & ScavangerHuntRewardData
export type DataBasedOnDefaults = CookieStateFalse & SettingsData & StatesData

function getState<StateType>(schema: ZodSchema, state: string | undefined | null, fallbackState: StateType): StateType {
    if (state === undefined || state === null) return fallbackState
    const exctractedState = schema.safeParse(state)
    return exctractedState.success ? exctractedState.data : fallbackState
}

export const load = (async ({ cookies, params, url: { searchParams } }) => {
    const route = NavigationSchema.safeParse(params.navigation)
    if (!route.success) throw fail(404, { error: "Page not found" })

    // Return data state based on cookies
    const cookiesAllowed = cookies.get(cookiesAllowedKey) === "true"
    if (cookiesAllowed) {
        cookies.set(navigationStateKey, String(route.data), { httpOnly: false })
        return {
            [audioVolumeKey]: getState<AudioVolume>(audioVolumeSchema, cookies.get(audioVolumeKey), 0.1),
            [computerScreenIndexKey]: getState<ComputerScreenIndex>(
                computerScreenIndexSchema,
                cookies.get(computerScreenIndexKey),
                0,
            ),
            [cookiesAllowedKey]: true,
            [darkModeKey]: !(cookies.get(darkModeKey) === "false"),
            [decidedOnCookiesKey]: cookies.get(decidedOnCookiesKey) === "true",
            email: EMAIL,
            [firstVisitKey]: !(cookies.get(firstVisitKey) === "false"),
            [likesEightBitFontKey]: !(cookies.get(likesEightBitFontKey) === "false"),
            [navigationExplainer2Key]: !(cookies.get(navigationExplainer2Key) === "false"),
            [navigationExplainerKey]: !(cookies.get(navigationExplainerKey) === "false"),
            [navigationStateKey]: route.data,
            phoneNumber: PHONE_NUMBER,
            [scavengerHuntDoneKey]: cookies.get(scavengerHuntDoneKey) === "true",
        } satisfies DataBasedOnCookies
    }

    if (searchParams.get(cookiesAllowedKey) === "false") {
        return {
            [audioVolumeKey]: getState<AudioVolume>(audioVolumeSchema, searchParams.get(audioVolumeKey), 0.1),
            [computerScreenIndexKey]: getState<ComputerScreenIndex>(
                computerScreenIndexSchema,
                searchParams.get(computerScreenIndexKey),
                0,
            ),
            [cookiesAllowedKey]: false,
            [darkModeKey]: !(searchParams.get(darkModeKey) === "false"),
            [decidedOnCookiesKey]: searchParams.get(decidedOnCookiesKey) === "true",
            email: EMAIL,
            [firstVisitKey]: !(searchParams.get(firstVisitKey) === "false"),
            [likesEightBitFontKey]: !(searchParams.get(likesEightBitFontKey) === "false"),
            [navigationExplainer2Key]: !(searchParams.get(navigationExplainer2Key) === "false"),
            [navigationExplainerKey]: !(searchParams.get(navigationExplainerKey) === "false"),
            [navigationStateKey]: route.data,
            phoneNumber: PHONE_NUMBER,
            [scavengerHuntDoneKey]: searchParams.get(scavengerHuntDoneKey) === "true",
        } satisfies DataBasedOnParameters
    }

    // Default data state of the application
    return {
        [audioVolumeKey]: 0.1,
        [computerScreenIndexKey]: 0,
        [cookiesAllowedKey]: false,
        [darkModeKey]: true,
        [decidedOnCookiesKey]: false,
        [firstVisitKey]: true,
        [likesEightBitFontKey]: true,
        [navigationExplainer2Key]: false,
        [navigationExplainerKey]: false,
        [navigationStateKey]: NavigationSchema.enum.computer,
        [scavengerHuntDoneKey]: false,
    } satisfies DataBasedOnDefaults
}) satisfies PageServerLoad

export const actions = {
    allowCookies: async ({ cookies }) => {
        cookies.set(cookiesAllowedKey, "true")
        cookies.set(decidedOnCookiesKey, "true")
        throw redirect(302, "/")
    },

    removeCookies: async ({ cookies }) => {
        cookies.getAll().forEach((cookie) => cookies.delete(cookie.name))
        throw redirect(302, "/")
    },

    setDefaultAudioVolume: async ({ cookies, request }) => {
        if (cookies.get(cookiesAllowedKey) === "true") {
            const formData = await request.formData()

            const volume = audioVolumeSchema.safeParse(formData.get(audioVolumeKey))

            if (!volume.success) return fail(400, { error: "Incorrect value supplied" })

            cookies.set(audioVolumeKey, String(volume.data), { httpOnly: false })

            throw redirect(302, "/")
        }

        return fail(400, { error: "Cookies not allowed" })
    },

    toggleBoolean: async ({ cookies, request }) => {
        if (cookies.get(cookiesAllowedKey) === "true") {
            const formData = await request.formData()

            const key = formData.get(booleanNameKey)
            const value = formData.get(valueKey)

            let boolean
            if (value === "true") boolean = "true"
            else if (value === "false") boolean = "false"
            else return fail(400, { error: "Incorrect value supplied" })

            if (key === null) return fail(400, { error: "No formName key supplied" })

            cookies.set(String(key), String(boolean), { httpOnly: false })

            throw redirect(302, "/")
        }

        return fail(400, { error: "Cookies not allowed" })
    },
} satisfies Actions
