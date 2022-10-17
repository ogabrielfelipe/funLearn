import { Request, Response } from "express";

class SendFileModelCreatestudentController {
  async handle(req: Request, res: Response) {
    // #swagger.start

    // #swagger.path = '/student/modelo-criacao'
    // #swagger.method = 'get'
    // #swagger.description = 'Endpoint para fazer o download do modelo de importação dos alunos.'
    // #swagger.produces = ["application/json"]
    // #swagger.tags = ['student']

    const path = require("path");
    var modeloCriacao = path.resolve(
      "static/modelo_criacao_usuario_aluno.xlsx"
    );

    /* #swagger.responses[200] = { 
            description: 'Arquivo baixado com sucesso.' 
    } */

    return res.status(200).sendFile(modeloCriacao);
    // #swagger.end
  }
}

export { SendFileModelCreatestudentController }