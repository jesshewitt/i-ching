import hexagrams from '/data/hexagrams.json' with { type: 'json' }
import trigrams from '/data/trigrams.json' with { type: 'json' }
import {html} from '../../html.js'

class Home {
    // create and return the page view, with a list of trigrams and hexagrams
    static render() {
        return html`
            <h2>Trigrams</h2>
            <ul class="tri-grid">
                ${trigrams.map(tri => html`
                    <li>
                        <span class="tri-glyph">${tri.unicode}</span>
                        <span class="hex-cname">${tri.cname.split(' ')[0]}</span>
                        <span class="hex-cename">${tri.cename}</span>
                        <span class="hex-ename">${tri.ename}</span>
                    </li>
                `)}
            </ul>

            <h2>Hexagrams</h2>
            <ul class="hex-grid">
                ${hexagrams.map(hex => html`
                    <li>
                        <a href="/hexagram/${hex.id}" class="hex-row">
                            <span class="hex-num">${hex.id}.</span>
                            <span class="hex-glyph">${String.fromCodePoint(0x4DBF + hex.id)}</span>
                            <span class="hex-cname">${hex.cname.split(' ')[0]}</span>
                            <span class="hex-cename">${hex.cename}</span>
                            <span class="hex-ename">${hex.ename}</span>
                        </a>
                    </li>
                `)}
            </ul>
        `
    }
}

export default Home
