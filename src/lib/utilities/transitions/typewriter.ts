export default function typewriter(
    node: HTMLElement,
    { speed = 1.666, containerElement }: { speed?: number; containerElement?: HTMLElement },
) {
    const text = node ? node.textContent : false
    if (!text) return
    const duration = text.length / (speed * 0.01)
    return {
        duration,
        tick: (t: number) => {
            const i = Math.trunc(text.length * t)
            node.textContent = text.slice(0, i)
            if (containerElement) containerElement.scrollTop = containerElement.scrollHeight
        },
    }
}
