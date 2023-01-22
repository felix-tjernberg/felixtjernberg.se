<script lang="ts">
    import { onMount } from "svelte"
    import { answeredCall, conversationDone, momCalling } from "$stores/phoneSectionStores"

    const FONT_SIZE = 12 as const

    let canvas: HTMLCanvasElement
    let canvasContext: CanvasRenderingContext2D
    let canvasHeight: number
    let canvasWidth: number

    let jsLoaded = false

    onMount(() => {
        jsLoaded = true
        canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D
        canvasHeight = canvas.height
        canvasWidth = canvas.width
        canvasContext.font = `${FONT_SIZE}px var(--font-family-primary-fat)`
    })

    $: if (jsLoaded) {
        canvasContext.textAlign = "center"
        const middleY = canvasHeight / 2
        const middleX = canvasWidth / 2

        if (JSON.parse($answeredCall)) {
            canvasContext.clearRect(0, 0, canvas.width, canvas.height)
            canvasContext.fillText("mom", middleX, middleY + FONT_SIZE / 2)
        }
        if (JSON.parse($momCalling)) {
            canvasContext.fillText("mom", middleX, middleY - 2)
            canvasContext.fillText("calling", middleX, middleY + FONT_SIZE + 2)
        }
        if (JSON.parse($conversationDone)) {
            canvasContext.clearRect(0, 0, canvas.width, canvas.height)
        }
    }
</script>

<canvas bind:this={canvas} width="138" height="103" class="absolute" />

<style>
    canvas {
        background-color: #607b53;
        top: 117px;
        left: 32px;
        z-index: -1;
    }
</style>
