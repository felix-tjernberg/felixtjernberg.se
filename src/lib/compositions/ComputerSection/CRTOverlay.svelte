<div class="crt-effect background absolute inset" />
<slot />
<div class="crt-effect overlay absolute inset" />

<style>
    .crt-effect.background {
        background: radial-gradient(transparent, black), green;
        z-index: -1;
    }
    :global([data-dark-mode="false"] .crt-effect.background) {
        background: radial-gradient(transparent, #888888), #ffffff;
    }
    .crt-effect.background,
    .crt-effect.overlay,
    .crt-effect.overlay::after,
    .crt-effect.overlay::before {
        pointer-events: none;
    }
    .crt-effect.overlay::before {
        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
            linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
        background-size: 100% 6.66px, 6.66px 100%;
        width: 100%;
        height: 100%;
    }
    .crt-effect.overlay::before,
    .crt-effect.overlay::after {
        pointer-events: none;
        position: absolute;
        display: block;
        content: "";
        width: 100%;
    }
    .crt-effect.overlay::after {
        animation: scan-line 5s linear infinite;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.2) 10%, rgba(0, 0, 0, 0.1) 100%);
        height: 50px;
        bottom: 100%;
        z-index: 2;
    }
    @keyframes scan-line {
        0% {
            bottom: 100%;
        }
        100% {
            opacity: 0.1;
            bottom: -50px;
        }
    }
</style>
