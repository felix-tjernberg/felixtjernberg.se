<script lang="ts">
    import Button from "$components/Button/Button.svelte"
    import SingleDigitInput from "$components/SingleDigitInput/SingleDigitInput.svelte"

    let pin: string

    let pin1: number | "" | undefined = undefined
    let pin2: number | "" | undefined = undefined
    let pin3: number | "" | undefined = undefined
    let pin4: number | "" | undefined = undefined
    $: pin = `${pin1}${pin2}${pin3}${pin4}`
    //TODO $: if (pin === "1234") $computerScreenIndex = 1
</script>

<div id="first-screen" class="height-100percent flex">
    <div id="top-left" class="absolute">
        <p><span class="visually-hidden">corner number 1: </span>1000</p>
    </div>
    <div id="top-right" class="absolute">
        <p><span class="visually-hidden">corner number 2: </span>200</p>
    </div>
    <div id="bottom-left" class="absolute">
        <p><span class="visually-hidden">corner number 3: </span>30</p>
    </div>
    <div id="bottom-right" class="absolute">
        <p><span class="visually-hidden">corner number 4: </span>4</p>
    </div>
    <div id="content" class="margin-vertical-auto margin-horizontal width-100percent padding-vertical">
        <p class="font-family-primary-fat line-height-1">enter pin</p>
        <div class="flex-center">
            <SingleDigitInput label="pin number 1" bind:value={pin1} testid="pin-input" />
            <SingleDigitInput label="pin number 2" bind:value={pin2} testid="pin-input" />
            <SingleDigitInput label="pin number 3" bind:value={pin3} testid="pin-input" />
            <SingleDigitInput label="pin number 4" bind:value={pin4} testid="pin-input" />
        </div>
        <Button label="log in" class="margin-auto" />
    </div>
</div>

<style>
    #content {
        max-height: 100vh;
        overflow-y: auto;
    }
    #top-right {
        rotate: 6.66deg;
    }
    #bottom-left {
        rotate: 6.9deg;
    }
    #bottom-right {
        rotate: -7.2deg;
    }
    #bottom-left,
    #bottom-right {
        bottom: 0;
    }
    #top-right,
    #bottom-right {
        right: 0;
    }
    #top-left,
    #top-right {
        top: 0;
    }
    #top-left,
    #bottom-left {
        left: 0;
    }
    @media (min-height: 400px) and (min-width: 400px) {
        #bottom-left,
        #bottom-right {
            bottom: 1em;
        }
        #top-right,
        #bottom-right {
            right: 1em;
        }
        #top-left,
        #top-right {
            top: 1em;
        }
        #top-left,
        #bottom-left {
            left: 1em;
        }
    }
</style>
