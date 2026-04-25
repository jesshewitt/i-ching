import {html} from '../../html.js'

class Error404 {
    static title() { return 'I Ching | Not Found' }

    // create and return page content for 404 errors
    static render() {
        return html`
            <h2> Error! </h2>
            The requested page was not found.
        `
    }
}

export default Error404
