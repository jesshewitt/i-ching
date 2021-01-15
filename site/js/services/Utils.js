const Utils = { 
    // --------------------------------
    //  parse a url and break it into resource, id and verb
    // --------------------------------
    parseRequestURL: () => {

        let url = location.hash.slice(1).toLowerCase() || '/'
        let r = url.split('/')
        let request = {
            resource: null,
            id: null,
            action: null
        }
        request.url = url
        request.resource = r[1]
        request.id = r[2]
        request.action = r[3]

        return request
    },

    // --------------------------------
    //  simple sleep implementation
    // --------------------------------
    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}

export default Utils