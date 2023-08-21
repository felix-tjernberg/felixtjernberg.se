import { maxAge } from "./maxAge"
export function setJSCookie(key: string, value: string): void {
    document.cookie = `${key}=${value};samesite:lax;max-age=${maxAge}`
}
