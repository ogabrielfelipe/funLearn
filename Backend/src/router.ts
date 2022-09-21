
import { Router } from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../src/swagger/swagger_output.json'
import { AuthAdministratorController } from './controller/administrator/AuthAdministratorController';
import { ChangeAdministratorController } from './controller/administrator/ChangeAdministratorController';
import { CreateAdministratorController } from './controller/administrator/CreateAdminstratorController';
import { AuthTeacherController } from './controller/teacher/AuthTeacherController';
import { ChangeTeacherController } from './controller/teacher/ChangeTeacherController';
import { CreateTeacherController } from './controller/teacher/CreateTeacherController';
import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

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

export default router