require("dotenv").config();

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import cors from 'cors';

import router from './router'


const app = express();

app.use(cors())
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