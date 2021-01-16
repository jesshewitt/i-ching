class Header {
    // return the page header with navigation links, reading link with generated random seed
    static render() {
        return `
            <h1> I Ching </h1>
            <nav>
                <ul>
                    <li><a href="#/">Home</a></li>
                    <li><a href="#/about">About</a></li>
                    <li><a href="#/reading/${(Math.random() * 1000000).toFixed(0)}">Reading</a></li>
                </ul>
            </nav>
        `
    }
}

export default Header