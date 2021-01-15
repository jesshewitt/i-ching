import Utils from '../../services/utils.js'

let Error404 = {   
    render: async () => {
        let request = Utils.parseRequestURL()

        let view =  `
            <h2> Error! </h2>
            The page ${request.url} was not found.
        `

        return view
    }   
}

export default Error404