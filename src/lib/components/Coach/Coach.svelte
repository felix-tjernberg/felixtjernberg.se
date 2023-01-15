<script lang="ts">
    import coach from "$assets/images/coach.png"
</script>

<picture class="absolute">
    <img
        class="absolute"
        src={coach}
        alt="felix tjernberg in coach attire walking away from camera, with the text Dalecarlia Rebels on his upper back" />
</picture>

<style>
    picture {
        inset: 0;
        height: 100%;
        width: 100%;
    }
    img {
        animation: head-bob 4.5s infinite;
        transition-timing-function: cubic-bezier(1, 1, 0, 0);
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        height: 66%;
    }
    img,
    picture {
        pointer-events: none;
    }
    @keyframes head-bob {
        0% {
            translate: -1% 3%;
        }
        25% {
            translate: 0% 1%;
        }
        50% {
            translate: 1% 3%;
        }
        75% {
            translate: 0% 1%;
        }
        100% {
            translate: -1% 3%;
        }
    }
</style>
