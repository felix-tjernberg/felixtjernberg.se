<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"

    import { enhance } from "$app/forms"

    import { booleanNameKey, valueKey } from "$utilities/toggleBooleanKeys"
    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { setJSCookie } from "$utilities/setJSCookie"
    import Description from "$components/Description.svelte"

    export let booleanName: string
    export let labels: string[]

    export let boolean: boolean = true
    export let description: string
    export let noScriptDescription: string | false = false
    export let testid: string | undefined = undefined

    let icons = Boolean($$slots.firstIcon && $$slots.secondIcon)
</script>

<Description {description} noScriptDescription={noScriptDescription ? noScriptDescription : description}>
    {#if $cookiesAllowed}
        <form
            data-testid={testid}
            class="flex-center"
            class:icons
            action="?/toggleBoolean"
            method="POST"
            use:enhance={({ cancel, formData }) => {
                cancel()
                const booleanValue = formData.get(valueKey)
                console.log(booleanValue)

                if (booleanValue === "true") boolean = true
                else if (booleanValue === "false") boolean = false
                else return //TODO handle this error, however it only occurs if user manipulates the DOM, so I will leave it for now

                if ($cookiesAllowed) setJSCookie(booleanName, boolean.toString())
            }}>
            <input type="hidden" name={booleanNameKey} value={booleanName} />
            {#if icons}
                <Button
                    active={boolean ? "yes" : "no"}
                    label={labels[0]}
                    name={valueKey}
                    disabled={boolean}
                    value="true">
                    <slot name="firstIcon" slot="icon" />
                </Button>
                <Button
                    active={!boolean ? "yes" : "no"}
                    label={labels[1]}
                    name={valueKey}
                    disabled={!boolean}
                    value="false">
                    <slot name="secondIcon" slot="icon" />
                </Button>
            {:else}
                <Button
                    active={boolean ? "yes" : "no"}
                    label={labels[0]}
                    name={valueKey}
                    disabled={boolean}
                    value="true" />
                <Button
                    active={!boolean ? "yes" : "no"}
                    label={labels[1]}
                    name={valueKey}
                    disabled={!boolean}
                    value="false" />
            {/if}
        </form>
    {:else}
        <form class="flex-center" class:icons on:submit={() => (boolean = !boolean)} data-testid={testid}>
            <HiddenInputs excludeStates={[booleanName]} />
            {#if icons}
                <Button
                    active={boolean ? "yes" : "no"}
                    label={labels[0]}
                    name={booleanName}
                    disabled={boolean}
                    value="true">
                    <slot name="firstIcon" slot="icon" />
                </Button>
                <Button
                    active={!boolean ? "yes" : "no"}
                    label={labels[1]}
                    name={booleanName}
                    disabled={!boolean}
                    value="false">
                    <slot name="secondIcon" slot="icon" />
                </Button>
            {:else}
                <Button
                    active={boolean ? "yes" : "no"}
                    label={labels[0]}
                    name={booleanName}
                    disabled={boolean}
                    value="true" />
                <Button
                    active={!boolean ? "yes" : "no"}
                    label={labels[1]}
                    name={booleanName}
                    disabled={!boolean}
                    value="false" />
            {/if}
        </form>
    {/if}
</Description>

<style>
    .icons {
        gap: 1em;
    }
</style>
