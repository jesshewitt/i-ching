import hexagrams from '/data/hexagrams.json' with { type: 'json' }
import {html, raw} from '../../html.js'

class Hexagram {

    static getHexagram(id) {
        // look up hexagram by id
        if (id >= 1 && id <= hexagrams.length) {
            return hexagrams[id - 1]
        }
        return {}
    }

    // create the 6 lines of the hexagram in SVG
    static getSVG(values) {
        const lines = values.split('')
        const svg = []

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            const lineOffset = (i * 9.09 * 2).toString() + '%'
            let out
            switch (line) {
            case '7':
                out = `<rect x='0' y='${lineOffset}' width='100%' height='9.09%' class='black' />`
                break
            case '8':
                out = `
                    <g>
                        <rect x='0' y='${lineOffset}' width='40%' height='9.09%' class='black' />
                        <rect x='60%' y='${lineOffset}' width='40%' height='9.09%' class='black' />
                    </g>`
                break
            default:
                out = ''
                break
            }
            svg.push(out)
        }

        return svg.join('\n')
    }

    static render(id) {
        // look up hexagram by its id
        const hexagram = Hexagram.getHexagram(id)

        // return error if hexagram not found
        if (!hexagram.id) {
            return html`
                <h2>Not Found</h2>
                Hexagram ${id} was not found. Try this <a href='/'>list of hexagrams</a>.
            `
        }

        // create the SVG representation of the hexagram
        const svglines = Hexagram.getSVG(hexagram.value)
        const char = hexagram.cname.split(' ')[0]
        const label = `Hexagram ${hexagram.id}: ${char} ${hexagram.ename}`

        // reverse so that top line is first (non-destructive)
        const lines = hexagram.lines.slice().reverse()
        const linesCommentary = hexagram.linesCommentary.slice().reverse()

        return html`
            <svg class='svglines' role='img' width='64' height='64' viewBox='0 0 100 100'>
                <title>${label}</title>
                ${raw(svglines)}
            </svg>
            <h2>
                <span class='hex-id'>${hexagram.id}</span>.
                <span class='cname'>${char}</span>
                <span class='cename'>${hexagram.cename}</span>
                -
                <span class='ename'>${hexagram.ename}</span>
            </h2>

            <div class='commentary comment'>${hexagram.commentary}</div>
            <div class='judgment pre'>${hexagram.judgment}</div>
            <div class='judgment-commentary comment'>${hexagram.judgmentCommentary}</div>
            <div class='image pre'>${hexagram.image}</div>
            <div class='image-commentary comment'>${hexagram.imageCommentary}</div>

            <h3>Changing Lines</h3>
            <div class='lines'>
                ${lines.map((line, i) => html`
                    <div class='pre'>${line}</div>
                    <div class='comment'>${linesCommentary[i]}</div>
                `)}
            </div>
        `
    }
}

export default Hexagram
