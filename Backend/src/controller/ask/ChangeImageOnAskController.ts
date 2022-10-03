import { Request, Response } from "express";
import { ChangeImageOnAskService } from "../../service/ask/ChangeImageOnAskService";
import { FindAskService } from "../../service/ask/FindAskService";



class ChangeImageOnAskController{
    async handle(req: Request, res: Response){

        const askID = req.query['askID'] as string;
        const image = req.file

        const path = require('path')
        const fs = require('fs');

        const imagePath = path.resolve(`ImagesAsk/${image?.filename}`);

        var result;
        if(fs.existsSync(imagePath)){

            //--- Função para buscar a imagem que foi cadastrada na pergunta e excluir caso exista.
            const findImageSave = new FindAskService();
            const findImageSaveRes = await findImageSave.execute(askID)

            if (findImageSaveRes?.image){
                fs.unlink(path.resolve(`ImagesAsk/${findImageSaveRes?.image}`), (er: any) => {
                    if (er) throw new Error(er);
                })
            }

            //--- Função para realizar a alteração cadastral da imagem
            const changeImagenOnAsk = new ChangeImageOnAskService();
            result = await changeImagenOnAsk.execute({
                askID: askID,
                image: !image?.filename ? "" : image?.filename as string
            })


            return res.status(200).json(result)
        }else{
            return res.status(404).json({error: "Image not found."})
        }
    }
}

export { ChangeImageOnAskController }