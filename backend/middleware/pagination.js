const pagination =  (model) => {
    return async (req,res,next)=> {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 1
        const search = req.query.search || ''

        const startIndex = (page-1)*limit
        const endIndex = page*limit

        const results = {}

        const query = {}
        if (search) {
            query.boardgameName = { $regex: search, $options: 'i' }
        }


        try {
            const query = {}
            if (search) {
                query.boardgameName = { $regex: search, $options: 'i' }
            }
            const docCount = await model.countDocuments(query).exec()
            results.current = {
                page:page,
                totalPage: Math.ceil(docCount/limit),
            }
            if(endIndex < docCount){
                results.next = {
                    page: page+1,
                    limit: limit,
                }
            }else{
                results.next = {
                    page: null
                }
            }
            if(startIndex > 0){
                results.previous = {
                    page: page-1,
                    limit: limit,
                }
            }else{
                results.previous = {
                    page:null
                }
            }
            results.results = await model.find(query).limit(limit).skip(startIndex).exec()
            res.paginatedResults = results
            next()
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }
}

module.exports = pagination