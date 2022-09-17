import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import router from './router'


const app = express();

app.use(cors())
app.use(express.json())

app.use(morgan("dev"))

app.use(router)

app.listen(3333, () => {
    console.log(`[SERVER] Running at http://localhost:3333`)
})