<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import HiddenInputs from "$components/HiddenInputs.svelte"

    import { enhance } from "$app/forms"

    import { booleanNameKey, valueKey } from "$utilities/toggleBooleanKeys"
    import { cookiesAllowed } from "$stores/settings/cookiesAllowed"
    import { setJSCookie } from "$utilities/setJSCookie"

    export let boolean: boolean = true
    export let booleanName: string
    export let description: string | undefined = undefined
    export let labels: string[]
    export let testid: string | undefined = undefined

    let icons = Boolean($$slots.firstIcon && $$slots.secondIcon)
</script>

<div class="flex-column-center" data-testid={testid}>
    {#if description}
        <p>{description}</p>
    {/if}
    {#if $cookiesAllowed}
        <form
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
        <form class="flex-center" class:icons on:submit={() => (boolean = !boolean)}>
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
</div>

<style>
    p {
        color: var(--white);
        max-width: 100%;
        rotate: -1.72deg;
        text-align: center;
        translate: -1em -0.5em;
        width: auto;
    }
    .icons {
        gap: 1em;
    }
</style>
