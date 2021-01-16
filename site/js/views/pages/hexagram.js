import Hexagrams from '../../../data/hexagrams.js'

class Hexagram {

    static getHexagram(id) {
        // look up hexagram by id
        let hex = {}
        let hexagrams = Hexagrams.hexagrams()
        if (id >= 0 && id <= hexagrams.length) {
            hex = hexagrams[id - 1]
        }
    
        return hex
    }

    // create the 6 lines of the hexagram in SVG
    static getSVG(values) {
        let lines = values.split('')
        let svg = []

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i]
            let lineOffset = (i * 9.09 * 2).toString() + '%'
            let out
            switch (line) {
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
        let hexagram = Hexagram.getHexagram(id)

        // return error if hexagram not found
        if (!hexagram.id) {
            return `
                <h2>Not Found</h2>
                Hexagram ${id} was not found. Try this <a href='#/'>list of hexagrams</a>.
            `
        }

        // create the SVG representation of the hexagram
        let svglines = Hexagram.getSVG(hexagram.value)
        
        // reverse order so that top line is first
        hexagram.lines = hexagram.lines.reverse()
        hexagram.linesCommentary = hexagram.linesCommentary.reverse()

        // return page content
        let view =  `
            <svg id='svglines' width='64' height='64' viewBox='0 0 100 100'>${svglines}</svg>
            <h2>
                <span id='id'>${hexagram.id}</span>.
                <span id='cename'>${hexagram.cename}</span> - 
                <span id='ename'>${hexagram.ename}</span>
            </h2>

            <div id='commentary' class='comment'>${hexagram.commentary}</div>
            <div id='judgment' class='pre'>${hexagram.judgment}</div>
            <div id='judgmentcommentary' class='comment'>${hexagram.judgmentCommentary}</div>
            <div id='image' class='pre'>${hexagram.image}</div>
            <div id='imagecommentary' class='comment'>${hexagram.imageCommentary}</div>

            <h3>Changing Lines</h3>
            <div id='lines'>
                ${hexagram.lines.map((line, index) => { 
                    return `<div class='pre'>${hexagram.lines[index]}</div>
                    <div class='comment'>${hexagram.linesCommentary[index]}</div>`
                }).join('\n')}
            </div>
        `

        return view
    }
}

export default Hexagram