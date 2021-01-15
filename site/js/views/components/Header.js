
let Header = {
    render: async () => {
        let view =  `
            <h1> I Ching </h1>
            <nav>
                <ul>
                    <li><a href="#/">Home</a></li>
                    <li><a href="#/about">About</a></li>
                    <li><a href="#/reading/${(Math.random() * 1000000).toFixed(0)}">Reading</a></li>
                </ul>
            </nav>
        `

        return view
    },
    
    afterRender: async () => {}    
}

export default Header