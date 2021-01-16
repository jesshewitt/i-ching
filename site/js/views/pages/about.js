class About {
    // create and return page content about the i ching
    static render() {
        return `
            <h2>About</h2>
            <p>The <b>I Ching</b> (Book of Changes) is an ancient Chinese divination text and the oldest of the Chinese classics. 
            Possessing a history of more than two and a half millennia of commentary and interpretation, the <b>I Ching</b> is an influential 
            text read throughout the world, providing inspiration to the worlds of religion, psychoanalysis, business, literature, and art.</p>

            <p>The <b>I Ching</b> uses a type of divination called cleromancy, which produces apparently random numbers. 
            Six numbers between 6 and 9 are turned into a <a href="#/">hexagram</a>, which can then be looked up in the <b>I Ching</b> book, 
            arranged in an order known as the King Wen sequence. The interpretation of the readings found in the <b>I Ching</b> is 
            a matter of centuries of debate, and many commentators have used the book symbolically, often to provide guidance 
            for moral decision making as informed by Taoism and Confucianism.</p>
            <a href="https://en.wikipedia.org/wiki/I_Ching">I Ching on Wikipedia</a>

            <h2>More Information</h2>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/I_Ching_divination">Wikipedia - I Ching divination</a></li>
                <li><a href="http://www.jamesdekorne.com/GBCh/ichingdl.htm">Gnostic Book of Changes</a></li>
                <li><a href="http://ctext.org/book-of-changes">Chinese Text Project</a></li>
            </ul>
        `
    }
}

export default About