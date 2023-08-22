<script lang="ts">
    export let positionAbsolute = false
</script>

<span class="loading-dot" class:absolute={positionAbsolute}>.</span><span
    class="loading-dot"
    class:absolute={positionAbsolute}>.</span
><span class="loading-dot" class:absolute={positionAbsolute}>.</span>

<style>
    .absolute {
        /* This feels super hacky, but I could not spend more time to figure out a better solution, the problem is that when they are just position absolute they stick in the same position when scrolling, so this solution removes height and width and places them based on number of characters "initialize" has on SecondScreen where I need the dots to not take any with, as they made the container overflow-x scroll when toggling the audio element for some odd reason, also this solution does not seem to work on firefox, man I'm getting really tired of the browsers implementing stuff differently */
        width: 0;
        display: block;
        height: 0;
        top: 0;
        left: 50%;
        translate: 6.5ch;
    }
    .loading-dot.absolute:nth-of-type(2) {
        translate: 7.5ch;
    }
    .loading-dot.absolute:nth-of-type(3) {
        translate: 8.5ch;
    }
    .loading-dot:nth-of-type(1) {
        animation: dot1 1.337s infinite;
    }
    .loading-dot:nth-of-type(2) {
        animation: dot2 1.337s infinite;
    }
    .loading-dot:nth-of-type(3) {
        animation: dot3 1.337s infinite;
    }
    @keyframes dot1 {
        0% {
            opacity: 0;
        }
        33% {
            opacity: 1;
        }
        66% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }
    @keyframes dot2 {
        0% {
            opacity: 0;
        }
        33% {
            opacity: 0;
        }
        66% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    @keyframes dot3 {
        0% {
            opacity: 0;
        }
        33% {
            opacity: 0;
        }
        66% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
