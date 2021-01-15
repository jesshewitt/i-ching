// vanilla js SPA framework, adapted from https://github.com/rishavs/vanillajs-spa

import About        from './views/pages/about.js'
import Error404     from './views/pages/error404.js'
import Footer       from './views/components/footer.js'
import Header       from './views/components/header.js'
import Hexagram     from './views/pages/hexagram.js'
import Home         from './views/pages/home.js'
import Reading      from './views/pages/reading.js'
import Utils        from './services/utils.js'


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
    const header = null || document.querySelector('header')
    const content = null || document.querySelector('main')
    const footer = null || document.querySelector('footer')
    
    // render the header and footer
    header.innerHTML = await Header.render()
    await Header.afterRender()
    footer.innerHTML = await Footer.render()
    await Footer.afterRender()

    // parse the URL, retrieving id from the :id segment
    let request = Utils.parseRequestURL()
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.action ? '/' + request.action : '')
    
    // generate requested page if parsed URL is in our supported routes, otherwise generate 404 page
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render(request.id)
    await page.afterRender()

    // reset scroll on page change
    window.scrollTo(0, 0)
}

// listen on hash change
window.addEventListener('hashchange', router)

// listen on page load
window.addEventListener('load', router)