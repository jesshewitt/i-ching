const Utils = { 
    //  parse a url and break it into resource, id and action
    parseRequestURL: () => {
        let url = location.hash.slice(1).toLowerCase() || '/'
        let r = url.split('/')
        let request = {
            url,
            resource: r[1],
            id: r[2],
            action: r[3]
        }

        return request
    }
}

export default Utils