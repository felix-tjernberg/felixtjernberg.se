<script lang="ts">
    import coach from "$assets/images/coach.png"
</script>

<picture class="coach">
    <img
        src={coach}
        alt="felix tjernberg in coach attire walking away from camera, with the text Dalecarlia Rebels on his upper back" />
</picture>

<style>
    .coach {
        animation: head-bob 4.5s infinite;
        transition-timing-function: cubic-bezier(1, 1, 0, 0);
    }
    @keyframes head-bob {
        0% {
            transform: translate(-1%, 0%);
        }
        25% {
            transform: translate(0%, -2%);
        }
        50% {
            transform: translate(1%, 0%);
        }
        75% {
            transform: translate(0%, -2%);
        }
        100% {
            transform: translate(-1%, 0%);
        }
    }
</style>
