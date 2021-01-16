let Error404 = {   
    render: async () => {
        let view = await `
            <h2> Error! </h2>
            The page page was not found.
        `

        return view
    }   
}

export default Error404