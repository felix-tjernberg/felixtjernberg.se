import { type Actions, type Cookies, fail, redirect } from "@sveltejs/kit"
import {
    answerFormKey,
    answerKey,
    pin1Key,
    pin2Key,
    pin3Key,
    pin4Key,
    validateS1AnswerKey,
    validateS3AnswerKey,
    validateS4AnswerKey,
    validateS5AnswerKey,
    validateS6AnswerKey,
} from "$compositions/ComputerSection/answerFormKeys"
import { type AudioVolume, audioVolumeKey, audioVolumeSchema } from "$stores/settings/audioVolume"
import { booleanNameKey, valueKey } from "$utilities/toggleBooleanKeys"
import { cookiesAllowedKey, decidedOnCookiesKey } from "$stores/settings/cookiesAllowed"
import { EMAIL, PHONE_NUMBER } from "$env/static/private"
import {
    getScavengerHuntState,
    S2DefaultState,
    S4DefaultState,
    S5DefaultState,
    S6DefaultState,
    S7DefaultState,
    scavengerHuntDefaultState,
    scavengerHuntStateKey,
    type ScavengerHuntStates,
} from "$stores/states/scavengerHuntState"
import {
    navigationExplainer2Key,
    navigationExplainerKey,
    NavigationSchema,
    navigationStateKey,
    type NavigationStates,
} from "$stores/states/navigation"
import { darkModeKey } from "$stores/settings/darkMode"
import { firstVisitKey } from "$stores/states/firstVisit"
import { JSActiveKey } from "$utilities/JSActiveKey"
import { likesEightBitFontKey } from "$stores/settings/likesEightBitFont"
import type { PageServerLoad } from "./$types"
import { settingsOpenKey } from "$stores/states/settingsOpen"
import type { ZodSchema } from "zod"

type SettingsData = {
    [audioVolumeKey]: AudioVolume
    [darkModeKey]: boolean
    [likesEightBitFontKey]: boolean
}

type StatesData = {
    [decidedOnCookiesKey]: boolean
    [firstVisitKey]: boolean
    [navigationStateKey]: NavigationStates
    [scavengerHuntStateKey]: ScavengerHuntStates
    [navigationExplainer2Key]: boolean
    [navigationExplainerKey]: boolean
    [settingsOpenKey]: boolean
}

type CookieStateTrue = {
    [cookiesAllowedKey]: true
}
type CookieStateFalse = {
    [cookiesAllowedKey]: false
}

//TODO not sure how to deal with this yet, point is to only send this when user has finished scavenger hunt
//TODO also when dealing with this, check if scavState is 7 to show return them otherwise they should be undefined or null
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
    const paramsRoute = NavigationSchema.safeParse(params.navigation)
    if (!paramsRoute.success) throw fail(404, { error: "Page not found" })

    // Return data state based on cookies
    const cookiesAllowed = cookies.get(cookiesAllowedKey) === "true"
    if (cookiesAllowed) {
        cookies.set(navigationStateKey, String(paramsRoute.data), { httpOnly: false })

        return {
            [audioVolumeKey]: getState<AudioVolume>(audioVolumeSchema, cookies.get(audioVolumeKey), 0.1),
            [cookiesAllowedKey]: true,
            [darkModeKey]: !(cookies.get(darkModeKey) === "false"),
            [decidedOnCookiesKey]: cookies.get(decidedOnCookiesKey) === "true",
            email: EMAIL,
            [firstVisitKey]: !(cookies.get(firstVisitKey) === "false"),
            [likesEightBitFontKey]: !(cookies.get(likesEightBitFontKey) === "false"),
            [navigationExplainer2Key]: !(cookies.get(navigationExplainer2Key) === "false"),
            [navigationExplainerKey]: !(cookies.get(navigationExplainerKey) === "false"),
            [navigationStateKey]: paramsRoute.data,
            phoneNumber: PHONE_NUMBER,
            [scavengerHuntStateKey]: getScavengerHuntState(cookies.get(scavengerHuntStateKey)),
            [settingsOpenKey]: cookies.get(settingsOpenKey) === "true",
        } satisfies DataBasedOnCookies
    }

    // Return data state based on search parameters if cookies are not allowed
    if (searchParams.get(cookiesAllowedKey) === "false") {
        // If navigationState search parameter does not match route redirect to correct route and keep search parameters
        const searchParamsRoute = NavigationSchema.safeParse(searchParams.get(navigationStateKey))
        if (searchParamsRoute.success && searchParamsRoute.data !== paramsRoute.data) {
            let searchParamsString = "?"
            searchParams.forEach((value, key) => (searchParamsString += `&${key}=${value}`))
            throw redirect(302, `/${searchParamsRoute.data}${searchParamsString}`)
        }

        return {
            [audioVolumeKey]: getState<AudioVolume>(audioVolumeSchema, searchParams.get(audioVolumeKey), 0.1),
            [cookiesAllowedKey]: false,
            [darkModeKey]: !(searchParams.get(darkModeKey) === "false"),
            [decidedOnCookiesKey]: searchParams.get(decidedOnCookiesKey) === "true",
            email: EMAIL,
            [firstVisitKey]: !(searchParams.get(firstVisitKey) === "false"),
            [likesEightBitFontKey]: !(searchParams.get(likesEightBitFontKey) === "false"),
            [navigationExplainer2Key]: !(searchParams.get(navigationExplainer2Key) === "false"),
            [navigationExplainerKey]: !(searchParams.get(navigationExplainerKey) === "false"),
            [navigationStateKey]: paramsRoute.data,
            phoneNumber: PHONE_NUMBER,
            [scavengerHuntStateKey]: getScavengerHuntState(searchParams.get(scavengerHuntStateKey)),
            [settingsOpenKey]: searchParams.get(settingsOpenKey) === "true",
        } satisfies DataBasedOnParameters
    }

    // Return default data state of the application
    return {
        [audioVolumeKey]: 0.1,
        [cookiesAllowedKey]: false,
        [darkModeKey]: true,
        [decidedOnCookiesKey]: false,
        [firstVisitKey]: true,
        [likesEightBitFontKey]: true,
        [navigationExplainer2Key]: false,
        [navigationExplainerKey]: false,
        [navigationStateKey]: NavigationSchema.enum.computer,
        [scavengerHuntStateKey]: scavengerHuntDefaultState,
        [settingsOpenKey]: false,
    } satisfies DataBasedOnDefaults
}) satisfies PageServerLoad

function routeFromFormData(formData: FormData, route: NavigationStates) {
    const audioVolume = formData.get(audioVolumeKey)
    const darkMode = formData.get(darkModeKey)
    const likesEightBitFont = formData.get(likesEightBitFontKey)
    const navigationExplainer2 = formData.get(navigationExplainer2Key)
    const navigationExplainer = formData.get(navigationExplainerKey)

    return `/${route}?${cookiesAllowedKey}=false&${audioVolumeKey}=${audioVolume}&${darkModeKey}=${darkMode}&${decidedOnCookiesKey}=true&${firstVisitKey}=false&${likesEightBitFontKey}=${likesEightBitFont}&${navigationExplainer2Key}=${navigationExplainer2}&${navigationExplainerKey}=${navigationExplainer}&${navigationStateKey}=${route}`
}

async function getAnswerFormData(request: Request): Promise<{
    answer: FormDataEntryValue | null
    cookiesAllowedHiddenInput: FormDataEntryValue | null
    formData: FormData
}> {
    const formData = await request.formData()
    const cookiesAllowedHiddenInput = formData.get(cookiesAllowedKey)
    const answer = formData.get(answerKey)
    return { answer, cookiesAllowedHiddenInput, formData }
}

function handleIvalidAnswer(cookiesAllowedHiddenInput: FormDataEntryValue | null, formData: FormData) {
    if (cookiesAllowedHiddenInput === "false")
        throw redirect(
            302,
            routeFromFormData(formData, NavigationSchema.enum.computer) +
                `&${scavengerHuntStateKey}=${getScavengerHuntState(
                    String(formData.get(scavengerHuntStateKey)),
                )}&error=true`,
        )
    return fail(400, { error: "invalid answer", formName: answerFormKey })
}

function updateScavengerHuntState(
    cookies: Cookies,
    cookiesAllowedHiddenInput: FormDataEntryValue | null,
    formData: FormData,
    newState: ScavengerHuntStates,
) {
    if (cookies.get(cookiesAllowedKey) === "true") {
        cookies.set(scavengerHuntStateKey, newState, { httpOnly: false })
        if (formData.get(JSActiveKey) === "false") throw redirect(302, "/computer")
        return { newState }
    } else {
        // in case someone submits the form without cookiesAllowed being false
        if (cookiesAllowedHiddenInput !== "false") throw redirect(302, `/`)
        throw redirect(
            302,
            routeFromFormData(formData, NavigationSchema.enum.computer) + `&${scavengerHuntStateKey}=${newState}`,
        )
    }
}

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

    updateScavengerHuntState: async ({ cookies, request }) => {
        if (cookies.get(cookiesAllowedKey) === "true") {
            const formData = await request.formData()
            const scavengerHuntState = formData.get(scavengerHuntStateKey)

            if (scavengerHuntState === null) return fail(400, { error: "No state supplied" })

            cookies.set(scavengerHuntStateKey, getScavengerHuntState(String(scavengerHuntState)), { httpOnly: false })

            throw redirect(302, "/")
        }

        return fail(400, { error: "Cookies not allowed" })
    },

    [validateS1AnswerKey]: async ({ cookies, request }) => {
        const formData = await request.formData()

        const cookiesAllowedHiddenInput = formData.get(cookiesAllowedKey)
        const pin1 = formData.get(pin1Key)
        const pin2 = formData.get(pin2Key)
        const pin3 = formData.get(pin3Key)
        const pin4 = formData.get(pin4Key)

        if (pin1 === null || pin2 === null || pin3 === null || pin4 === null)
            return fail(400, { error: "Answer value is null" })

        if (pin1 !== "1" || pin2 !== "2" || pin3 !== "3" || pin4 !== "4")
            return handleIvalidAnswer(cookiesAllowedHiddenInput, formData)

        return updateScavengerHuntState(cookies, cookiesAllowedHiddenInput, formData, S2DefaultState)
    },

    [validateS3AnswerKey]: async ({ cookies, request }) => {
        const { formData, cookiesAllowedHiddenInput, answer } = await getAnswerFormData(request)

        if (answer === null) return fail(400, { error: "Answer value is null" })

        if (answer.toString().toLowerCase() !== "yes") return handleIvalidAnswer(cookiesAllowedHiddenInput, formData)

        return updateScavengerHuntState(cookies, cookiesAllowedHiddenInput, formData, S4DefaultState)
    },

    [validateS4AnswerKey]: async ({ cookies, request }) => {
        const { formData, cookiesAllowedHiddenInput, answer } = await getAnswerFormData(request)

        if (answer === null) return fail(400, { error: "Answer value is null" })

        if (answer !== "188" && answer !== "189" && answer !== "190")
            return handleIvalidAnswer(cookiesAllowedHiddenInput, formData)

        return updateScavengerHuntState(cookies, cookiesAllowedHiddenInput, formData, S5DefaultState)
    },

    [validateS5AnswerKey]: async ({ cookies, request }) => {
        const { formData, cookiesAllowedHiddenInput, answer } = await getAnswerFormData(request)

        if (answer === null) return fail(400, { error: "Answer value is null" })

        if (answer !== "3") return handleIvalidAnswer(cookiesAllowedHiddenInput, formData)

        return updateScavengerHuntState(cookies, cookiesAllowedHiddenInput, formData, S6DefaultState)
    },

    [validateS6AnswerKey]: async ({ cookies, request }) => {
        const { formData, cookiesAllowedHiddenInput, answer } = await getAnswerFormData(request)

        if (answer === null) return fail(400, { error: "Answer value is null" })

        if (answer !== "200") return handleIvalidAnswer(cookiesAllowedHiddenInput, formData)

        return updateScavengerHuntState(cookies, cookiesAllowedHiddenInput, formData, S7DefaultState)
    },
} satisfies Actions
