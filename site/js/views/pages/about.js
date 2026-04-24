import {html} from '../../html.js'

class About {
    // create and return page content about the i ching
    static render() {
        return html`
            <h2>About</h2>
            <p>The <b>I Ching</b> (Book of Changes) is an ancient Chinese divination text and the oldest of the Chinese classics.
            Possessing a history of more than two and a half millennia of commentary and interpretation, the <b>I Ching</b> is an influential
            text read throughout the world, providing inspiration to the worlds of religion, psychoanalysis, business, literature, and art.</p>

            <p>The <b>I Ching</b> uses a type of divination called cleromancy, which produces apparently random numbers.
            Six numbers between 6 and 9 are turned into a <a href="/">hexagram</a>, which can then be looked up in the <b>I Ching</b> book,
            arranged in an order known as the King Wen sequence. The interpretation of the readings found in the <b>I Ching</b> is
            a matter of centuries of debate, and many commentators have used the book symbolically, often to provide guidance
            for moral decision making as informed by Taoism and Confucianism.</p>
            <a href="https://en.wikipedia.org/wiki/I_Ching">I Ching on Wikipedia</a>

            <h2>About this translation</h2>
            <p>The English text on this site is an original translation of Richard Wilhelm's 1924 German edition,
            <i>I Ging: Das Buch der Wandlungen</i>, which is in the public domain. The widely cited Wilhelm-Baynes
            English version (1950) remains under copyright, so the rendering here is a fresh translation from Wilhelm's
            German rather than a reuse of Baynes. It covers the core text (Book 1): the judgment, the image, and the
            six line readings for each of the 64 hexagrams, together with Wilhelm's commentary on each.</p>

            <p>Wilhelm collaborated with the Qing-era scholar Lao Nai-hsuan and produced a translation that sits
            below the Confucian/Taoist split, treating the I Ching as a text shared by both traditions. Where
            Baynes renders 君子 (jūnzǐ) as "the superior man," this translation follows Wilhelm's <i>der Edle</i>
            more closely as "the noble one," meaning a person cultivated in character rather than aristocratic by birth.</p>

            <p>The German source was taken from <a href="https://schuledesrades.org/public/iging/buch/">Schule des Rades</a>.</p>

            <p>Translated by Claude (Anthropic), 2026, from Richard Wilhelm's 1924 German edition. Edited by Jess Hewitt.
            Released into the public domain under
            <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0 Universal</a>.</p>

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
