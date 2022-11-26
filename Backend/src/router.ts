
import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import  {v4 as uuidv4}  from 'uuid'

import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../src/swagger/swagger_output.json'
import { AuthAdministratorController } from './controller/administrator/AuthAdministratorController';
import { ChangeAdministratorController } from './controller/administrator/ChangeAdministratorController';
import { CreateAdministratorController } from './controller/administrator/CreateAdminstratorController';
import { CreateManyStudentController } from './controller/student/CreateManyStudentController';
import { CreateStudentController } from './controller/student/CreateStudentController';
import { AuthTeacherController } from './controller/teacher/AuthTeacherController';
import { ChangeTeacherController } from './controller/teacher/ChangeTeacherController';
import { CreateTeacherController } from './controller/teacher/CreateTeacherController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateTeamController } from './controller/team/CreateTeamController';
import { ChangestudentController } from './controller/student/ChangeStudentController';
import { FindStudentController } from './controller/student/FindStudentController';
import { FindManyStudentController } from './controller/student/FindManyStudentController';
import { SendFileModelCreatestudentController } from './controller/student/SendFileModelCreateStudentController';
import { HomePage } from './controller/default/HomePage';
import { AuthStudentController } from './controller/student/AuthStudentController';
import { FindTeacherController } from './controller/teacher/FindTeacherController';
import { FindManyTeacherController } from './controller/teacher/FindManyTeacherController';
import { FindAdministratorController } from './controller/administrator/FindAdministratorController';
import { FindManyAdministratorController } from './controller/administrator/FindManyAdministratorController';
import { ChangeTeamController } from './controller/team/ChangeTeamController';
import { FindTeamController } from './controller/team/FindTeamController';
import { FindTeamsController } from './controller/team/FindTeamsController';
import { CreateAskController } from './controller/ask/CreateAskController';
import { ChangeAskController } from './controller/ask/ChangeAskController';
import { ChangeAnswerController } from './controller/answer/ChangeAnswerController';
import { DeleteAnswerController } from './controller/answer/DeleteAnswerController';
import { CreateAnswerController } from './controller/answer/CreateAnswerController';
import { FindAskController } from './controller/ask/FindAskController';
import { FindManyAskController } from './controller/ask/FindManyAskController';
import { ChangeImageOnAskController } from './controller/ask/ChangeImageOnAskController';
import { DeleteImageOnAskController } from './controller/ask/DeleteImageOnAskController';
import { AuthSessionAdministratorController } from './controller/administrator/AuthSessionAdministratorController';
import { AuthSessionStudentController } from './controller/student/AuthSessionStudentController';
import { AuthSessionTeacherController } from './controller/teacher/AuthSessionTeacherController';
import { CreateThemeController } from './controller/theme/CreateThemeController';
import { FindThemesController } from './controller/theme/FindThemesController';
import { ChangeTipController } from './controller/tip/ChangeTipController';
import { CreateTipController } from './controller/tip/CreateTipController';
import { DeleteTipController } from './controller/tip/DeleteTipController';

const path = require('path')
const router = Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: path.resolve(process.env['DIR_TEMP_IMPORT']),
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
router.post('/administrator/auth/session',isAuthenticated, new AuthSessionAdministratorController().handle )
router.post('/administrator/auth', new AuthAdministratorController().handle)
router.post('/administrator', isAuthenticated, new CreateAdministratorController().handle)
router.put('/administrator', isAuthenticated, new ChangeAdministratorController().handle)
router.get('/administrator', isAuthenticated, new FindAdministratorController().handle)
router.get('/adminstrators', isAuthenticated, new FindManyAdministratorController().handle)

// ----------- Teacher -----------
router.post('/teacher/auth/session', isAuthenticated, new AuthSessionTeacherController().handle)
router.post('/teacher/auth', new AuthTeacherController().handle)
router.post('/teacher', isAuthenticated, new CreateTeacherController().handle)
router.put('/teacher', isAuthenticated, new ChangeTeacherController().handle)
router.get('/teacher', isAuthenticated, new FindTeacherController().handle)
router.get('/teachers', isAuthenticated, new FindManyTeacherController().handle)

// ----------- student -----------
router.post('/student/auth/session', new AuthSessionStudentController().handle)
router.post('/student/auth', new AuthStudentController().handle)
router.post('/student', isAuthenticated, new CreateStudentController().handle)
router.post('/student/many', isAuthenticated, upload.single('file') , new CreateManyStudentController().handle)
router.put('/student', isAuthenticated, new ChangestudentController().handle)
router.get('/student', isAuthenticated, new FindStudentController().handle)
router.get('/students', isAuthenticated, new FindManyStudentController().handle)
router.get('/student/modelo-criacao', isAuthenticated, new SendFileModelCreatestudentController().handle)

// ----------- student -----------
router.post('/team', isAuthenticated, new CreateTeamController().handle)
router.put('/team', isAuthenticated, new ChangeTeamController().handle)
router.get('/team', isAuthenticated, new FindTeamController().handle)
router.get('/teams', isAuthenticated, new FindTeamsController().handle)


// ------------ Ask ---------------

const storage = multer.diskStorage({
    destination: path.resolve(process.env['DIR_IMAGEASK']),
    filename(req, file, callback) {
        const fileName = `${uuidv4()}-${file.originalname}`
        return callback(null, fileName)
    },
})
const uploadImageAsk = multer({storage})

router.post('/ask', isAuthenticated, uploadImageAsk.single('image'), new CreateAskController().handle)
router.put('/ask', isAuthenticated, new ChangeAskController().handle)
router.get('/ask', isAuthenticated, new FindAskController().handle)
router.get('/asks', isAuthenticated, new FindManyAskController().handle)


// #swagger.start

// #swagger.path = '/ask/image'
// #swagger.method = 'get'
// #swagger.description = 'Endpoint para exibir a imagem que deseja visualizar.'
// #swagger.produces = ["application/json"]
// #swagger.tags = ['Ask']

/*
    #swagger.parameters['name-image'] = {
        in: 'query',
        description: "Deverá ser preenchido com o nome da imagem que está cadastrada na pergunta.",
        requerid: true       
    }

*/

router.use('/ask/image', express.static(process.env['DIR_IMAGEASK'] as string))

/* #swagger.responses[404] = { 
    description: 'Imagem não encontrada.' 
} */
/* #swagger.responses[200] = { 
    description: 'Busca efetuada com sucesso e exibe a imagem.' 
} */

// #swagger.end

router.put('/ask/image', isAuthenticated, uploadImageAsk.single('image'), new ChangeImageOnAskController().handle)
router.delete('/ask/image', isAuthenticated, new DeleteImageOnAskController().handle)


// ----------- Answer --------------

router.post('/answer', isAuthenticated, new CreateAnswerController().handle)
router.put('/answer', isAuthenticated, new ChangeAnswerController().handle)
router.delete('/answer', isAuthenticated, new DeleteAnswerController().handle)


// -------------- Theme --------------
router.post('/theme', isAuthenticated, new CreateThemeController().handle)
router.get('/themes', isAuthenticated, new FindThemesController().handle)



// -------------- Tip --------------
router.post('/tip', isAuthenticated, new CreateTipController().handle)
router.put('/tip', isAuthenticated, new ChangeTipController().handle)
router.delete('/tip', isAuthenticated, new DeleteTipController().handle)


export default router