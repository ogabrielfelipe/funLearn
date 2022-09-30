import { Request, Response } from "express";



class HomePage{
    async handle(req: Request, res: Response){
        
        // #swagger.start

        // #swagger.path = '/'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint da tela inicial das APIs do Sistema FunLearn.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Home']

        const path = require('path')
        var homeService = path.resolve('src/pages/initial/index.html');
        res.status(200).sendFile(homeService)
    }
}

export { HomePage }