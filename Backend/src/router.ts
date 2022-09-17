
import { Router } from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../src/swagger/swagger_output.json'
import { CreateAdministratorController } from './controller/administrator/CreateAdminstratorController';

const router = Router();

//Rota de documentos
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


router.post('/admin', new CreateAdministratorController().handle)

export default router