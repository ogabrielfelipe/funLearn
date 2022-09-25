import { Request, Response } from "express";
import xlsxFile from 'read-excel-file/node'
import { CreateStudantService } from "../../service/studant/CreateStudantService";

class CreateManyStudantController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/studant/many'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para cadastrar usuários Estudantes através da importação de arquivo.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Studant']

        /*
            #swagger.parameters['name', 'teamID'] = {
                in: 'body',
                description: " name: Deverá ser preenchido com o nome do usuário; \n
                    teamID: Deverá ser preenchido com o identificador da turma.",
                requerid: true,
                schema: { $ref: "#/definitions/StudantFile" }        
            }

            #swagger.parameters['file'] = {
                in: 'file',
                description: " file: Arquivo que deverá ser importado seguindo o modelo disponibilizado para importar os alunos.",
                requerid: true,      
            }
         */

        const { password, teamID } = req.body;

        const file = req.file;

        if (!file){
            throw new Error('file not found.')
        }

        const path = require('path')
        let fs = require('fs');
        const createStudant = new CreateStudantService();

        //let count = 0;
        var listUsers = Array();
        var listUsersCreate = Array();

        xlsxFile(path.resolve(`tmp/import/${file.filename}`)).then( (rows) => {
            rows.slice(3, rows.length).forEach( (row) => {
                listUsers.push( {
                        name: row[0].toString(), 
                        register: Number(row[1])
                    } )
            })
            
            try{
                listUsers.forEach( async (r) => {
                    createStudant.execute({
                        name: r.name,
                        register: r.register,
                        active: true,
                        password: password,
                        teamID: teamID
                    }).then(() => {
                        //count += 1;
                    })
                    
                })

                console.log(listUsersCreate)
                
            }catch(err){

            }

            fs.unlink(path.resolve(`tmp/import/${file.filename}`), (er: any) => {
                if (er) throw er;
            })

            /* #swagger.responses[400] = { 
                description: 'Turma não encontrada; \nTurma Inativa; \n Arquivo não importado.' 
            } */
            /* #swagger.responses[200] = { 
                description: 'Usuários cadastrados com sucesso' 
            } */
            return res.status(200).json({msg: 'Usuários cadastrados com sucesso', listUsersCreate})
        })     
        // #swagger.end
    }
}

export { CreateManyStudantController }