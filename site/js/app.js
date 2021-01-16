// vanilla js SPA framework, adapted from https://github.com/rishavs/vanillajs-spa

import About        from './views/pages/about.js'
import Error404     from './views/pages/error404.js'
import Footer       from './views/components/footer.js'
import Header       from './views/components/header.js'
import Hexagram     from './views/pages/hexagram.js'
import Home         from './views/pages/home.js'
import Reading      from './views/pages/reading.js'


// supported routes - any other url will throw a 404 error
const routes = {
    '/': Home,
    '/about': About,
    '/hexagram/:id': Hexagram,
    '/reading/:id': Reading,
    '/reading': Reading
}

//  parse a url and break it into resource and id
const parseRequestURL = () => {
    let url = location.hash.slice(1).toLowerCase() || '/'
    let r = url.split('/')

    return {
        url,
        resource: r[1],
        id: r[2]
    }
}

// the router code - compares URL to the list of supported routes and then renders the corresponding page
const router = () => {

    // lazy load view element:
    const header = null || document.querySelector('header')
    const content = null || document.querySelector('main')
    const footer = null || document.querySelector('footer')
    
    // render the header and footer
    header.innerHTML = Header.render()
    footer.innerHTML = Footer.render()

    // parse the URL
    let request = parseRequestURL()
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '')
    
    // generate requested page if parsed URL is in our supported routes, otherwise generate 404 page
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = page.render(request.id)

    // reset scroll on page change
    window.scrollTo(0, 0)
}

// listen on hash change
window.addEventListener('hashchange', router)

// listen on page load
window.addEventListener('load', router)