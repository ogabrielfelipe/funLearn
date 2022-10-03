import { Request, Response } from "express";
import { ChangeImageOnAskService } from "../../service/ask/ChangeImageOnAskService";
import { FindAskService } from "../../service/ask/FindAskService";



class DeleteImageOnAskController{
    async handle(req: Request, res: Response){


        // #swagger.start

        // #swagger.path = '/ask/imagea'
        // #swagger.method = 'delete'
        // #swagger.description = 'Endpoint para excluir a imagem vinculada a pergunta.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Ask']

        /*
            #swagger.parameters['askID'] = {
                in: 'query',
                description: "Deverá ser preenchido com o identificador da pergunta.",
                requerid: true        
            }

         */

        const askID = req.query['askID'] as string;

        const path = require('path')
        const fs = require('fs');

        
        //--- Função para buscar a imagem que foi cadastrada na pergunta e excluir caso exista.
        const findImageSave = new FindAskService();
        const findImageSaveRes = await findImageSave.execute(askID)

        if(!findImageSaveRes?.image){
            return res.status(404).json({
                error: "Pergunta não possui imagem para excluir."
            })
        }

        const imagePath = path.resolve(`ImagesAsk/${findImageSaveRes?.image}`);
        var result;
        if(fs.existsSync(imagePath)){

            if (findImageSaveRes?.image){
                fs.unlink(path.resolve(`ImagesAsk/${findImageSaveRes?.image}`), (er: any) => {
                    if (er) throw er;
                })
            }

             //--- Função para realizar a alteração cadastral da imagem
             const changeImagenOnAsk = new ChangeImageOnAskService();
             result = await changeImagenOnAsk.execute({
                 askID: findImageSaveRes?.id!,
                 image: ""
             })

            /* #swagger.responses[200] = { 
                description: 'imagem excluida com sucesso.',
                schema: { $ref: "#/definitions/Ask2" }   
            } */
            
            return res.status(200).json(result)
        }else{

            /* #swagger.responses[404] = { 
                description: 'Pergunta não possui imagem para excluir. \nImagem não encontrada.' 
            } */

            /* #swagger.responses[500] = { 
                description: 'Relacionado a erro de persistência no banco de dados. \nNão foi possível realizar a exclusão.'
            } */
            return res.status(500).json({error: "Não foi possível realizar a exclusão."})
        }

        // #swagger.end
    }
}


export { DeleteImageOnAskController }