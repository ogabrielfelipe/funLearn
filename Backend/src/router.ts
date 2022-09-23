
import { Request, Response, Router } from 'express';
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


router.get('/', (_req: Request, res: Response) => {
    const path = require('path')
    var homeService = path.resolve('src/pages/initial/index.html');
    res.status(200).sendFile(homeService)
})

//Rota de documentos
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// ----------- Administrator -----------
router.post('/admin/auth', new AuthAdministratorController().handle)
router.post('/admin', isAuthenticated, new CreateAdministratorController().handle)
router.put('/admin', isAuthenticated, new ChangeAdministratorController().handle)


// ----------- Teacher -----------
router.post('/teacher/auth', new AuthTeacherController().handle)
router.post('/teacher', isAuthenticated, new CreateTeacherController().handle)
router.put('/teacher', isAuthenticated, new ChangeTeacherController().handle)


// ----------- Studant -----------
router.post('/studant', isAuthenticated, new CreateStudantController().handle)
router.post('/studant/many', isAuthenticated, upload.single('file') , new CreateManyStudantController().handle)


// ----------- Studant -----------
router.post('/team', isAuthenticated, new CreateTeamController().handle)

export default router