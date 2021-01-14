// vanilla js SPA framework, adapted from https://github.com/rishavs/vanillajs-spa

import About        from './views/pages/About.js'
import Error404     from './views/pages/Error404.js'
import Footer       from './views/components/Footer.js'
import Header       from './views/components/Header.js'
import Hexagram     from './views/pages/Hexagram.js'
import Home         from './views/pages/Home.js'
import Reading      from './views/pages/Reading.js'
import Utils        from './services/Utils.js'


// supported routes - any other url will throw a 404 error
const routes = {
    '/': Home,
    '/about': About,
    '/hexagram/:id': Hexagram,
    '/reading/:id': Reading,
    '/reading': Reading
}


// the router code - compares URL to the list of supported routes and then renders the corresponding page
const router = async () => {

    // lazy load view element:
    const header = null || document.getElementById('header')
    const content = null || document.getElementById('content')
    const footer = null || document.getElementById('footer')
    
    // render the header and footer
    header.innerHTML = await Header.render()
    await Header.afterRender()
    footer.innerHTML = await Footer.render()
    await Footer.afterRender()


    // get the parsed request URL
    let request = Utils.parseRequestURL()

    // further parse the URL, retrieving id from the :id segment
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    
    // generate requested page if parsed URL is in our supported routes, otherwise generate 404 page
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render()
    await page.afterRender()

    // reset scroll on page change
    window.scrollTo(0, 0)
}

// listen on hash change
window.addEventListener('hashchange', router)

// listen on page load
window.addEventListener('load', router)