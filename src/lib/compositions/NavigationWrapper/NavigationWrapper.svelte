<div class="navigation">
    <div>
        <a on:click|preventDefault href={"/phone"}>phone</a>
        <slot name="phone" />
    </div>
    <div>
        <a on:click|preventDefault href={"/computer"}>computer</a>
        <slot name="computer" />
    </div>
    <div>
        <a on:click|preventDefault href={"/welcome"}>welcome</a>
        <slot name="welcome" />
    </div>
    <div>
        <a on:click|preventDefault href={"/coach"}>coach</a>
        <slot name="coach" />
    </div>
    <div>
        <a on:click|preventDefault href={"/contact"}>contact</a>
        <slot name="contact" />
    </div>
</div>

<style>
    .navigation {
        display: grid;
        height: 100%;
        width: 100%;
        grid-template-columns: repeat(3, 100vw);
        grid-template-rows: repeat(3, 100vh);
        grid-template-areas:
            "phone . computer"
            ". welcome ."
            "coach . contact";
        translate: 0 -100vh;
        overflow: hidden;
        scale: 0.3;
    }
    .navigation div:nth-of-type(1) {
        grid-area: phone;
    }
    .navigation div:nth-of-type(2) {
        grid-area: computer;
    }
    .navigation div:nth-of-type(3) {
        grid-area: welcome;
    }
    .navigation div:nth-of-type(4) {
        grid-area: coach;
    }
    .navigation div:nth-of-type(5) {
        grid-area: contact;
    }
    .navigation > div {
        position: relative;
        margin: 3%;
    }
    .navigation > div > a {
        display: flex;
        place-content: center;
        align-items: center;
        position: absolute;
        inset: 0;
        max-width: none;
        max-width: none;
        font-size: var(--font-size-600);
    }
</style>
