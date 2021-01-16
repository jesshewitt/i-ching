import Hexagrams    from '../../../data/hexagrams.js'
import Trigrams     from '../../../data/trigrams.js'


let Home = {
    render: () => {
        let view =  `
            <h2>Trigrams</h2>
            <ul>
            ${Trigrams.trigrams().map((tri) => 
                `<li>${tri.unicode} ${tri.cename} - ${tri.ename}</li>`
                ).join('\n')
            }
            </ul>

            <h2>Hexagrams</h2>
            <ul>    
                ${Hexagrams.hexagrams().map((hex) => 
                    `<li><a href="#/hexagram/${hex.id}">${hex.id}. ${hex.cename} - ${hex.ename}</a></li>`
                    ).join('\n')
                }
            </ul>
        `
        
        return view
    }
}

export default Home