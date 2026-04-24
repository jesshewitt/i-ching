import hexagrams from '/data/hexagrams.json' with { type: 'json' }
import {html, raw} from '../../html.js'
import {seeded} from '../../rng.js'

class Reading {

    static getLines(seed) {
        // seeded PRNG gives deterministic results for a given URL seed
        const rand = seeded(seed)

        // generate six lines for hexagram using simulated coin tosses
        let lines = ''
        for (let i = 0; i < 6; i++) {
            let sum = 0

            // for each line, flip 3 coins and sum values. heads = 3, tails = 2
            // result should be 6, 7, 8, or 9
            for (let j = 0; j < 3; j++) {
                rand() < 0.5 ? sum += 2 : sum += 3
            }
            lines += sum.toString()
        }

        return lines
    }

    // create the SVG representation of the hexagram
    static getSVG(values) {
        const lines = values.split('')
        const svg = []

        // create the lines. changing lines are in red (6, 9) and non-changing lines are black (7, 8)
        // 6 and 8 are broken lines, 7 and 9 are solid lines
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            const lineOffset = (i * 9.09 * 2).toString() + '%'
            let out
            switch (line) {
            case '6':
                out = `
                    <g>
                        <rect x='0' y='${lineOffset}' width='40%' height='9.09%' class='red' />
                        <rect x='60%' y='${lineOffset}' width='40%' height='9.09%' class='red' />
                    </g>`
                break
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
            case '9':
                out = `<rect x='0' y='${lineOffset}' width='100%' height='9.09%' class='red' />`
                break
            default:
                out = ''
                break
            }
            svg.push(out)
        }

        return svg.join('\n')
    }

    static getReading(seed) {
        // get the changing lines for the reading
        const changing = Reading.getLines(seed)
        const hexlines = changing.replace(/6/g, '8').replace(/9/g, '7')
        const hasChanging = hexlines !== changing

        // find and return hexagram with matching lines
        let reading = hexagrams.find(h => h.value === hexlines) || {}

        // if there are changing lines, convert to opposing non-changing line and look up a second hexagram
        let linesChanged = hexlines
        if (hasChanging) {
            linesChanged = changing.replace(/6/g, '7').replace(/9/g, '8')
            reading.linesChanged = linesChanged
            reading.hexchanged = hexagrams.find(h => h.value === linesChanged) || {}
        }

        reading.changing = changing
        reading.hasChanging = hasChanging

        return reading
    }

    static render(seed) {
        // generate reading, using id value from the URL as seed
        const reading = Reading.getReading(seed)
        const svglines = Reading.getSVG(reading.changing)
        const changing = reading.changing.split('').reverse()
        const char = reading.cname.split(' ')[0]
        const label = `Hexagram ${reading.id}: ${char} ${reading.ename}${reading.hasChanging ? ', with changing lines' : ''}`

        // create the page content for the reading
        const main = html`
            <svg class='svglines' role='img' width='64' height='64' viewBox='0 0 100 100'>
                <title>${label}</title>
                ${raw(svglines)}
            </svg>
            <h2>
                <span class='hex-id'>${reading.id}</span>.
                <span class='cname'>${char}</span>
                <span class='cename'>${reading.cename}</span>
                -
                <span class='ename'>${reading.ename}</span>
            </h2>

            <div class='commentary comment'>${reading.commentary}</div>
            <div class='judgment pre'>${reading.judgment}</div>
            <div class='judgment-commentary comment'>${reading.judgmentCommentary}</div>
            <div class='image pre'>${reading.image}</div>
            <div class='image-commentary comment'>${reading.imageCommentary}</div>

            <h3>Changing Lines</h3>
            ${reading.hasChanging ? '' : 'No changing lines.'}
            <div class='lines'>
                ${changing.map((line, i) => (line === '6' || line === '9') ? html`
                    <div class='pre'>${reading.lines[i]}</div>
                    <div class='comment'>${reading.linesCommentary[i]}</div>
                ` : '')}
            </div>
        `

        // if the reading has changing lines, append an extra section showing the second hexagram
        if (!reading.hasChanging) return main

        const svgchanged = Reading.getSVG(reading.linesChanged)
        const changedChar = reading.hexchanged.cname.split(' ')[0]
        const changedLabel = `Resulting hexagram ${reading.hexchanged.id}: ${changedChar} ${reading.hexchanged.ename}`

        return html`
            ${main}
            <div class='changingHexagrams'>
                <svg class='svglines' role='img' width='64' height='64' viewBox='0 0 100 100'>
                    <title>${label}</title>
                    ${raw(svglines)}
                </svg>
                changing to
                <svg class='svglines' role='img' width='64' height='64' viewBox='0 0 100 100'>
                    <title>${changedLabel}</title>
                    ${raw(svgchanged)}
                </svg>
            </div>
            <h3>
                <span class='hex-id'>${reading.hexchanged.id}</span>.
                <span class='cname'>${changedChar}</span>
                <span class='cename'>${reading.hexchanged.cename}</span>
                -
                <span class='ename'>${reading.hexchanged.ename}</span>
            </h3>
            <div class='commentary comment'>${reading.hexchanged.commentary}</div>
            <div class='judgment pre'>${reading.hexchanged.judgment}</div>
            <div class='judgment-commentary comment'>${reading.hexchanged.judgmentCommentary}</div>
            <div class='image pre'>${reading.hexchanged.image}</div>
            <div class='image-commentary comment'>${reading.hexchanged.imageCommentary}</div>
        `
    }
}

export default Reading
