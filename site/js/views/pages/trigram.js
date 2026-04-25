import hexagrams from '/data/hexagrams.json' with { type: 'json' }
import trigrams from '/data/trigrams.json' with { type: 'json' }
import {html} from '../../html.js'

// Render a hexagram list row in the same shape used on the home page,
// so trigram pages reuse the same .hex-grid styling.
const hexRow = hex => html`
    <li>
        <a href="/hexagram/${hex.id}" class="hex-row">
            <span class="hex-num">${hex.id}.</span>
            <span class="hex-glyph">${String.fromCodePoint(0x4DBF + hex.id)}</span>
            <span class="hex-cname">${hex.cname.split(' ')[0]}</span>
            <span class="hex-cename">${hex.cename}</span>
            <span class="hex-ename">${hex.ename}</span>
        </a>
    </li>
`

class Trigram {

    static getTrigram(value) {
        return trigrams.find(t => t.value === value) || {}
    }

    static title(value) {
        const tri = Trigram.getTrigram(value)
        if (!tri.value) return 'I Ching | Not Found'
        return `I Ching | Trigram ${tri.cename}`
    }

    static render(value) {
        const tri = Trigram.getTrigram(value)
        if (!tri.value) {
            return html`
                <h2>Not Found</h2>
                Trigram ${value} was not found. Try this <a href='/'>list of trigrams</a>.
            `
        }

        const char = tri.cname.split(' ')[0]
        // hexagram value runs top-down: value[0..2] is the upper trigram, value[3..5] the lower.
        const upper = hexagrams.filter(h => h.value.slice(0, 3) === tri.value)
        const lower = hexagrams.filter(h => h.value.slice(3, 6) === tri.value)

        return html`
            <h2 class='trigram-heading'>
                <span class='tri-glyph'>${tri.unicode}</span>
                <span class='cname'>${char}</span>
                <span class='cename'>${tri.cename}</span>
                -
                <span class='ename'>${tri.ename}</span>
            </h2>

            <p>${tri.description}</p>

            <dl class='trigram-info'>
                <dt>Attribute</dt><dd>${tri.attribute}</dd>
                <dt>Image</dt><dd>${tri.image}</dd>
                <dt>Family</dt><dd>${tri.family}</dd>
                <dt>Animal</dt><dd>${tri.animal}</dd>
                <dt>Body part</dt><dd>${tri.bodyPart}</dd>
                <dt>Direction</dt><dd>${tri.direction}</dd>
                <dt>Season</dt><dd>${tri.season}</dd>
            </dl>

            <h3>Symbolic associations</h3>
            <p class='trigram-symbols'>${tri.symbols}.</p>
            <p class='comment'>${tri.commentary}</p>

            <h3>As upper trigram</h3>
            <ul class='hex-grid'>
                ${upper.map(hexRow)}
            </ul>

            <h3>As lower trigram</h3>
            <ul class='hex-grid'>
                ${lower.map(hexRow)}
            </ul>
        `
    }
}

export default Trigram
