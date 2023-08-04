export function setJSCookie(key: string, value: string): void {
    document.cookie = `${key}=${value};sameSite:lax;`
}
