import { audioVolume, audioVolumeKey } from "$stores/settings/audioVolume"
import {
    cookiesAllowed,
    cookiesAllowedKey,
    decidedOnCookies,
    decidedOnCookiesKey,
} from "$stores/settings/cookiesAllowed"
import { darkMode, darkModeKey } from "$stores/settings/darkMode"
import { firstVisit, firstVisitKey } from "$stores/states/firstVisit"
import { likesEightBitFont, likesEightBitFontKey } from "$stores/settings/likesEightBitFont"
import {
    navigationExplainer,
    navigationExplainer2,
    navigationExplainer2Key,
    navigationExplainerKey,
    navigationState,
    navigationStateKey,
} from "$stores/states/navigation"
import { scavengerHuntState, scavengerHuntStateKey } from "$stores/states/scavengerHuntState"

import { derived } from "svelte/store"

export const searchParameters = derived<
    (
        | typeof audioVolume
        | typeof cookiesAllowed
        | typeof darkMode
        | typeof decidedOnCookies
        | typeof firstVisit
        | typeof likesEightBitFont
        | typeof navigationExplainer
        | typeof navigationExplainer2
        | typeof navigationState
        | typeof scavengerHuntState
    )[],
    { name: string; value: unknown }[]
>(
    [
        audioVolume,
        cookiesAllowed,
        darkMode,
        decidedOnCookies,
        firstVisit,
        likesEightBitFont,
        navigationExplainer,
        navigationExplainer2,
        navigationState,
        scavengerHuntState,
    ],
    ([
        $audioVolume,
        $cookiesAllowed,
        $darkMode,
        $decidedOnCookies,
        $firstVisit,
        $likesEightBitFont,
        $navigationExplainer,
        $navigationExplainer2,
        $navigationState,
        $scavengerHuntState,
    ]) => [
        { name: audioVolumeKey, value: $audioVolume },
        { name: cookiesAllowedKey, value: $cookiesAllowed },
        { name: darkModeKey, value: $darkMode },
        { name: decidedOnCookiesKey, value: $decidedOnCookies },
        { name: firstVisitKey, value: $firstVisit },
        { name: likesEightBitFontKey, value: $likesEightBitFont },
        { name: navigationExplainerKey, value: $navigationExplainer },
        { name: navigationExplainer2Key, value: $navigationExplainer2 },
        { name: navigationStateKey, value: $navigationState },
        { name: scavengerHuntStateKey, value: $scavengerHuntState },
    ],
)
