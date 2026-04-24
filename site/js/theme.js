const KEY = 'i-ching-theme'
const NEXT = { auto: 'light', light: 'dark', dark: 'auto' }
const CLASSES = ['theme-dark', 'theme-light']

export function getTheme() {
    const root = document.documentElement
    if (root.classList.contains('theme-dark')) return 'dark'
    if (root.classList.contains('theme-light')) return 'light'
    return 'auto'
}

export function cycleTheme() {
    const root = document.documentElement
    const next = NEXT[getTheme()]

    root.classList.remove(...CLASSES)

    try {
        if (next === 'auto') {
            localStorage.removeItem(KEY)
        } else {
            root.classList.add(`theme-${next}`)
            localStorage.setItem(KEY, next)
        }
    } catch (e) {
        // localStorage may be unavailable (private mode, disabled). Class still applied for the session.
        if (next !== 'auto') root.classList.add(`theme-${next}`)
    }

    return next
}
