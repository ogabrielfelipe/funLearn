import { Request, Response } from "express";
import xlsxFile from 'read-excel-file/node'
import { CreateStudantService } from "../../service/studant/CreateStudantService";

class CreateManyStudantController{
    async handle(req: Request, res: Response){

        const { password } = req.body;

        const file = req.file;

        if (!file){
            throw new Error('file not found.')
        }

        const path = require('path')
        let fs = require('fs');
        const createStudant = new CreateStudantService();



        xlsxFile(path.resolve(`tmp/import/${file.filename}`)).then( async (rows) => {
            await rows.slice(3,rows.length).forEach(async (row) => {
                console.log(row[0], row[1])

                var name = row[0];
                var register = row[1];

                await createStudant.execute({
                    name: String(name),
                    register: Number(register),
                    password: password,
                    active: true
                })

            })

            fs.unlink(path.resolve(`tmp/import/${file.filename}`), (er: any) => {
                if (er) throw er;
            })
            return res.status(200).json({msg: 'Usuários cadastrados com sucesso'})

        })     
    }
}

export { CreateManyStudantController }