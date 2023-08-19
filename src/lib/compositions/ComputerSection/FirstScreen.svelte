<script lang="ts">
    import AnswerForm from "./AnswerForm.svelte"
    import SingleDigitInput from "$components/SingleDigitInput/SingleDigitInput.svelte"
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
        <AnswerForm actionName="validateFirstScreenAnswer" label="log in">
            <p slot="question" class="font-family-primary-fat line-height-1">enter pin</p>
            <p slot="errorMessage" class="font-family-primary-fat line-height-1">
                invalid<br /> pin code<br />try again
            </p>
            <div class="flex-center">
                <SingleDigitInput label="pin number 1" testid="pin-input" name="pin1" value="1" />
                <SingleDigitInput label="pin number 2" testid="pin-input" name="pin2" value="2" />
                <SingleDigitInput label="pin number 3" testid="pin-input" name="pin3" value="3" />
                <SingleDigitInput label="pin number 4" testid="pin-input" name="pin4" value="4" />
            </div>
        </AnswerForm>
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
