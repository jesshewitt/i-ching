import Hexagrams from '../../../data/hexagrams.js'
const {ranjs} = window

class Reading {

    static getLines(seed) {
        // set the seed for ranjs, to produce deterministic results
        ranjs.core.seed(seed)
    
        // generate six lines for hexagram using simulated coin tosses
        let lines = ''
        for (let i = 0; i < 6; i++) {
            let sum = 0
    
            // for each line, flip 3 coins and sum values. heads = 3, tails = 2
            // result should be 6, 7, 8, or 9
            for (let j = 0; j < 3; j++) {
                ranjs.core.float() < 0.5 ? sum += 2 : sum += 3
            } 
            lines += sum.toString()
        }
    
        return lines
    }

    // create the SVG representation of the hexagram
    static getSVG(values) {
        let lines = values.split('')
        let svg = []
    
        // create the lines. changing lines are in red (6, 9) and non-changing lines are black (7, 8)
        // 6 and 8 are broken lines, 7 and 9 are solid lines
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i]
            let lineOffset = (i * 9.09 * 2).toString() + '%'
            let out
            switch (line) {
            case '6':
                out = `
                    <g>
                        <rect x='0' y='${lineOffset}' width='40%' height='9.09%' class='red' /></rect>
                        <rect x='60%' y='${lineOffset}' width='40%' height='9.09%' class='red' /></rect>
                    </g>`
                break
            case '7':
                out = `<rect x='0' y='${lineOffset}' width='100%' height='9.09%' class='black' /></rect>`
                break
            case '8':
                out = `
                    <g>
                        <rect x='0' y='${lineOffset}' width='40%' height='9.09%' class='black' /></rect>
                        <rect x='60%' y='${lineOffset}' width='40%' height='9.09%' class='black' /></rect>
                    </g>`
                break
            case '9':
                out = `<rect x='0' y='${lineOffset}' width='100%' height='9.09%' class='red' /></rect>`
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
        let changing = Reading.getLines(seed)
        let hasChanging = false
    
        // replace changing lines (6, 9) with static lines (7, 8) for lookup
        let hexlines = changing.replace(/6/g, '8').replace(/9/g, '7')
        if (hexlines != changing) { 
            hasChanging = true 
        }
    
        // find and return hexagram with matching lines
        let hexagrams = Hexagrams.hexagrams()
        let reading = {}
        for (let i = 0; i < hexagrams.length; i++) {
            if (hexagrams[i].value == hexlines) {
                reading = hexagrams[i]
                break
            }
        }
    
        // if there are changing lines, convert to opposing non-changing line and look up a second hexagram
        let linesChanged = hexlines
        
        if (hasChanging) {
            linesChanged = changing.replace(/6/g, '7').replace(/9/g, '8')
            let hexchanged = {}
    
            for (let i = 0; i < hexagrams.length; i++) {
                if (hexagrams[i].value == linesChanged) {
                    hexchanged = hexagrams[i]
                    break
                }
            }
            reading.linesChanged = linesChanged
            reading.hexchanged = hexchanged
        }
    
        reading.changing = changing
        reading.hasChanging = hasChanging
    
        return reading
    }

    static render(seed) {
        // generate reading, using id value from the URL as seed
        let reading = Reading.getReading(seed)
        let svglines = Reading.getSVG(reading.changing)
        let changing = reading.changing.split('').reverse()

        // create the page content for the reading
        let view =  `
            <svg id='svglines' width='64' height='64' viewBox='0 0 100 100'>${svglines}</svg>
            <h2>
                <span id='id'>${reading.id}</span>.
                <span id='cename'>${reading.cename}</span> - 
                <span id='ename'>${reading.ename}</span>
            </h2>

            <div id='commentary' class='comment'>${reading.commentary}</div>
            <div id='judgment' class='pre'>${reading.judgment}</div>
            <div id='judgmentcommentary' class='comment'>${reading.judgmentCommentary}</div>
            <div id='image' class='pre'>${reading.image}</div>
            <div id='imagecommentary' class='comment'>${reading.imageCommentary}</div>

            <h3>Changing Lines</h3>
            ${reading.hasChanging ? '' : 'No changing lines.'}
            <div id='lines'>
                ${changing.map((line, index) => {
                    // only show reading for changing lines
                    if (line == '6' || line == '9') {
                        return `<div class='pre'>${reading.lines[index]}</div>
                        <div class='comment'>${reading.linesCommentary[index]}</div>`
                    }

                    return ''
                }).join('\n')}
            </div>
            `

        // if the reading has changing lines, append this extra section with a mini-reading for the second hexagram
        if (reading.hasChanging) {
            let svgchanged = Reading.getSVG(reading.linesChanged)
            view += `
                <svg id='svglines' width='64' height='64' viewBox='0 0 100 100'>${svglines}</svg>
                changing to 
                <svg id='svglines' width='64' height='64' viewBox='0 0 100 100'>${svgchanged}</svg>
                <h3> 
                    <span id='id'>${reading.hexchanged.id}</span>.
                    <span id='cename'>${reading.hexchanged.cename}</span> - 
                    <span id='ename'>${reading.hexchanged.ename}</span>
                </h3>
                <div id='commentary' class='comment'>${reading.hexchanged.commentary}</div>
                <div id='judgment' class='pre'>${reading.hexchanged.judgment}</div>
                <div id='judgmentcommentary' class='comment'>${reading.hexchanged.judgmentCommentary}</div>
                <div id='image' class='pre'>${reading.hexchanged.image}</div>
                <div id='imagecommentary' class='comment'>${reading.hexchanged.imageCommentary}</div>
            `
        }

        return view
    }
}

export default Reading