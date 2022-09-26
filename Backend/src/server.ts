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


app.use(router)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {

    switch (err.message){
        case 'teacher not found.':
            return res.status(404).json({
                error: "Professor não encontrado."
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
            return res.status(403).json({
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


        default:
            return res.status(500).json({
                status: "Error",
                mensage: err.message
            })

    }
   
})


app.listen(3333, () => {
    console.log(`[SERVER] Running at http://localhost:3333`)
})