<script lang="ts">
    import PhoneSection from "./PhoneSection.svelte"
    import { answeredCall, conversationDone, momCalling } from "$stores/states/phone"

    export let momCallingTest = false

    localStorage.clear()
    $answeredCall = false
    $conversationDone = false

    momCallingTest ? ($momCalling = true) : ($momCalling = false)
</script>

<PhoneSection />
