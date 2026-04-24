import {html} from '../../html.js'
import {getTheme} from '../../theme.js'

// U+FE0E (variation selector-15) forces text presentation so ☀ doesn't render as a colored emoji
const THEME_ICON = { auto: '◐︎', light: '☀︎', dark: '☾︎' }

function navLink(href, label, active) {
    return active
        ? html`<li><a href="${href}" aria-current="page">${label}</a></li>`
        : html`<li><a href="${href}">${label}</a></li>`
}

class Header {
    // return the page header with navigation links, reading link with generated random seed
    static render() {
        const path = location.pathname
        const seed = (Math.random() * 1000000).toFixed(0)
        const theme = getTheme()
        return html`
            <h1> I Ching </h1>
            <nav>
                <ul>
                    ${navLink('/', 'Home', path === '/')}
                    ${navLink('/about', 'About', path === '/about')}
                    ${navLink(`/reading/${seed}`, 'Reading', path.startsWith('/reading'))}
                    <li><button type="button" class="theme-toggle" aria-label="Theme: ${theme}. Click to change.">
                        <span aria-hidden="true">${THEME_ICON[theme]}</span>
                    </button></li>
                </ul>
            </nav>
        `
    }
}

export default Header
