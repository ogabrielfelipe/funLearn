require("dotenv").config();
require('./patch.ts')

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import cors from 'cors';

import router from './router'


const app = express();

app.use(cors({ exposedHeaders: ['x-access-token', 'x-access-type'] }))
app.use(express.json())

app.use(morgan("dev"))

app.use('/static', express.static(__dirname+"/pages/static"))

app.use(router)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {

    switch (err.message){
        case 'teacher not found.':
            return res.status(404).json({
                error: "Professor não encontrado."
            })
            break;

        case 'teacher is required.':
            return res.status(401).json({
                error: "Identificador do professor deve ser fornecido."
            })
            break;
        case 'admin not found.':
            return res.status(404).json({
                error: "Administrador não encontrado."
            })
            break;

        case 'username incorrect.':
            return res.status(401).json({
                error: "Nome do usuário Incorreto."
            })
            break;
        
        case 'user inative.':
            return res.status(403).json({
                error: "Usuário inativo."
            })
            break;
        
        case 'teacher inative.':
            return res.status(403).json({
                error: "Professor inativo."
            })
            break;

        case 'team not found.':
            return res.status(404).json({
                error: "Turma não encontrada."
            })
            break;
        case 'team inative.':
            return res.status(403).json({
                error: "Turma inativa."
            })
            break;

        case 'Password incorrect.':
            return res.status(401).json({
                error: "Senha incorreta"
            })
            break;
        
        case 'password invalid':
            return res.status(401).json({
                error: "Senha inválida."
            })
            break;

        case 'studant not found.':
            return res.status(404).json({
                error: "Aluno não encontrado."
            })
            break;
        case 'studant inative.':
            return res.status(403).json({
                error: "Aluno inativo."
            })
            break;
        case 'register incorrect.':
            return res.status(401).json({
                error: "Número da matrícula incorreta."
            })
            break;

        case 'team is required.':
            return res.status(401).json({
                error: 'É necessário preencher a turma.'
            })
            break;

        case 'studant is required.':
            return res.status(401).json({
                error: 'É necessário preencher o identificador do Aluno.'
            })
            break;

        case 'studant not found on table studantsOnTeams.':
            return res.status(404).json({
                error: "Aluno não encontrado no relacionamento com a Turma."
            })
            break;

        case 'user is not permission.':
            return res.status(401).json({
                error: "Usuário não possui permissão para acessar essas informações."
            })
            break;

        case 'identifier is required':
            return res.status(401).json({
                error: "Identificador do registro é necessário."
            })
            break;
        
        case 'password not sent.':
            return res.status(403).json({
                error: "Senha não enviada."
            })
            break;
        case 'team not sent.':
            return res.status(403).json({
                error: "Turma não enviada."
            })
            break;

        case 'Ask not found.':
            return res.status(404).json({
                error: "Pergunta não encontrada."
            })
            break;

        case 'answer not found.':
            return res.status(404).json({
                error: "Resposta não encontrada."
            })
            break;
        
        case 'There is already a correct alternative.':
            return res.status(401).json({
                error: "Já existe uma alteranativa correta para a pergunta vinculada."
            })
        case 'Question has more than one correct alternative.':
            return res.status(403).json({
                error: "Pergunta possui mais de uma alternativa correta."
            })

        case 'A correct answer to the question has not been identified.':
            return res.status(404).json({
                error: "Não foi identificado uma resposta correta para a pergunta."
            })
            break;

        case 'number of questions different from 4.':
            return res.status(403).json({
                error: "Número de alternativas diferente de 4."
            })
            break;

        case 'there must be 1 correct question.':
            return res.status(403).json({
                error: "Deve haver uma resposta correta."
            })
            break;

        case 'Error: description type incorrect.':
            return res.status(403).json({
                error: "Tipo do campo description incorreto."
            })
            break;

        case 'Error: correct type incorrect.':
            return res.status(403).json({
                error: "Tipo do campo correct incorreto."
            })
            break;


        default:
            return res.status(500).json({
                status: "Error",
                mensage: err.message
            })

    }
   
})

import os from 'os';

const networkInfo = os.networkInterfaces();

const platform = process.platform
let host = "";

if (platform == "linux"){
    if (!networkInfo.enp1s0){
        host = networkInfo.lo![0].address
    }else{
        host = networkInfo.enp1s0![0].address
    }
}else if (platform == "win32"){
    host = 'localhost'
    // networkInfo['Ethernet Instance 0']![1].address
}



app.listen(3333, () => {
    console.log(`[SERVER] Running at http://${host === "" ? "localhost" : host}:3333`)
})