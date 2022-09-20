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
    if (err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }   
    return res.status(500).json({
        status: "Error",
        mensage: "Internal Server Error."
    })
})


app.listen(3333, () => {
    console.log(`[SERVER] Running at http://localhost:3333`)
})