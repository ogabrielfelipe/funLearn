import { Request, Response } from "express";



class FindImageOnAskController{
    async handle(req: Request, res: Response){
        const nameImage = req.query['nameImage']

            const path = require('path')
            var fs = require('fs');

            const imagePath = path.resolve(`ImagesAsk/${nameImage}`);

            var imageAsk;
            if(fs.existsSync(imagePath)){
                var imageAsk = imagePath;
            }else{
                return res.status(404).json({msg: "Image not found."})
            }

            return res.status(200).sendFile(imageAsk)
        
    }
}

export { FindImageOnAskController }