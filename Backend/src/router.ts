
import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import  {v4 as uuidv4}  from 'uuid'

import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../src/swagger/swagger_output.json'
import { AuthAdministratorController } from './controller/administrator/AuthAdministratorController';
import { ChangeAdministratorController } from './controller/administrator/ChangeAdministratorController';
import { CreateAdministratorController } from './controller/administrator/CreateAdminstratorController';
import { CreateManyStudantController } from './controller/studant/CreateManyStudantController';
import { CreateStudantController } from './controller/studant/CreateStudantController';
import { AuthTeacherController } from './controller/teacher/AuthTeacherController';
import { ChangeTeacherController } from './controller/teacher/ChangeTeacherController';
import { CreateTeacherController } from './controller/teacher/CreateTeacherController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateTeamController } from './controller/team/CreateTeamController';
import { ChangeStudantController } from './controller/studant/ChangeStudantController';
import { FindStudantController } from './controller/studant/FindStudantController';
import { FindManyStudantController } from './controller/studant/FindManyStudantController';
import { SendFileModelCreateStudantController } from './controller/studant/SendFileModelCreateStudantController';
import { HomePage } from './controller/default/HomePage';
import { AuthStudantController } from './controller/studant/AuthStudantController';
import { FindTeacherController } from './controller/teacher/FindTeacherController';
import { FindManyTeacherController } from './controller/teacher/FindManyTeacherController';
import { FindAdministratorController } from './controller/administrator/FindAdministratorController';
import { FindManyAdministratorController } from './controller/administrator/FindManyAdministratorController';
import { ChangeTeamController } from './controller/team/ChangeTeamController';
import { FindTeamController } from './controller/team/FindTeamController';
import { FindTeamsController } from './controller/team/FindTeamsController';

const path = require('path')
const router = Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: path.resolve('tmp/import/'),
        filename(_req, file, cb){
            const fileName = `${uuidv4()}-${file.originalname}`
            return cb(null, fileName)
        }
    })
})

router.get('/', new HomePage().handle)

//Rota de documentos (Swagger)
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// ----------- Administrator -----------
router.post('/administrator/auth', new AuthAdministratorController().handle)
router.post('/administrator', isAuthenticated, new CreateAdministratorController().handle)
router.put('/administrator', isAuthenticated, new ChangeAdministratorController().handle)
router.get('/administrator', isAuthenticated, new FindAdministratorController().handle)
router.get('/adminstrators', isAuthenticated, new FindManyAdministratorController().handle)

// ----------- Teacher -----------
router.post('/teacher/auth', new AuthTeacherController().handle)
router.post('/teacher', isAuthenticated, new CreateTeacherController().handle)
router.put('/teacher', isAuthenticated, new ChangeTeacherController().handle)
router.get('/teacher', isAuthenticated, new FindTeacherController().handle)
router.get('/teachers', isAuthenticated, new FindManyTeacherController().handle)

// ----------- Studant -----------
router.post('/studant/auth', new AuthStudantController().handle)
router.post('/studant', isAuthenticated, new CreateStudantController().handle)
router.post('/studant/many', isAuthenticated, upload.single('file') , new CreateManyStudantController().handle)
router.put('/studant', isAuthenticated, new ChangeStudantController().handle)
router.get('/studant', isAuthenticated, new FindStudantController().handle)
router.get('/studants', isAuthenticated, new FindManyStudantController().handle)
router.get('/studant/modelo-criacao', isAuthenticated, new SendFileModelCreateStudantController().handle)

// ----------- Studant -----------
router.post('/team', isAuthenticated, new CreateTeamController().handle)
router.put('/team', isAuthenticated, new ChangeTeamController().handle)
router.get('/team', isAuthenticated, new FindTeamController().handle)
router.get('/teams', isAuthenticated, new FindTeamsController().handle)


export default router