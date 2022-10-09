import { Request, Response } from "express";
import { ChangeImageOnAskService } from "../../service/ask/ChangeImageOnAskService";
import { FindAskService } from "../../service/ask/FindAskService";



class ChangeImageOnAskController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/ask/imagea'
        // #swagger.method = 'put'
        // #swagger.description = 'Endpoint para alterar a imagem vinculada a pergunta.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Ask']

        /*
            #swagger.parameters['askID'] = {
                in: 'query',
                description: "Deverá ser preenchido com o identificador da pergunta.",
                requerid: true        
            }

            #swagger.parameters['image'] = {
                in: 'file',
                description: "deverá ser informado com a imagem que deseja vincular na pergunta.",
                requerid: true,      
            }
         */

        const askID = req.query['askID'] as string;
        const image = req.file

        const path = require('path')
        const fs = require('fs');
        
        const dir = process.env['DIR_IMAGEASK']

        const imagePath = path.resolve(`${dir}${image?.filename}`);

        var result;
        if(fs.existsSync(imagePath)){

            //--- Função para buscar a imagem que foi cadastrada na pergunta e excluir caso exista.
            const findImageSave = new FindAskService();
            const findImageSaveRes = await findImageSave.execute(askID)

            if (findImageSaveRes?.image){
                fs.unlink(path.resolve(`${dir}${findImageSaveRes?.image}`), (er: any) => {                  
                    if (er) throw new Error(er);
                })
            }

            //--- Função para realizar a alteração cadastral da imagem
            const changeImagenOnAsk = new ChangeImageOnAskService();
            result = await changeImagenOnAsk.execute({
                askID: askID,
                image: !image?.filename ? "" : image?.filename as string
            })


            /* #swagger.responses[200] = { 
                description: 'Imagem alterada com sucesso.',
                schema: { $ref: "#/definitions/Ask2" }   
            } */
            return res.status(200).json(result)
        }else{

            /* #swagger.responses[404] = { 
                description: 'Imagem não encontrada. \nPergunta não encontrada.' 
            } */

            return res.status(404).json({error: "Image not found."})
        }

        /* #swagger.responses[500] = { 
                description: 'Relacionado a erro de persistência no banco de dados.'
        } */


        // #swagger.end
    }
}

export { ChangeImageOnAskController }