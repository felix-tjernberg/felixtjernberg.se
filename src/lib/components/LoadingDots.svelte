<span class="loading-dot">.</span><span class="loading-dot">.</span><span class="loading-dot">.</span>

<style>
    .loading-dot:nth-last-of-type(1) {
        animation: dot3 1.337s infinite;
    }
    .loading-dot:nth-last-of-type(2) {
        animation: dot2 1.337s infinite;
    }
    .loading-dot:nth-last-of-type(3) {
        animation: dot1 1.337s infinite;
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
