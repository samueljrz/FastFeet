import { Router } from 'express';

import RecipientsController from './app/controllers/RecipientsController';
import SessionController from './app/controllers/SessionController';
import PostmanController from './app/controllers/PostmanController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';
import multerMiddleware from './app/middlewares/multer';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientsController.store);
routes.put('/recipients', RecipientsController.update);

routes.post('/files', multerMiddleware, FileController.store);

routes.get('/postman', PostmanController.index);
routes.post('/postman', PostmanController.store);
routes.put('/postman/:id', PostmanController.update);
routes.delete('/postman/:id', PostmanController.delete);

export default routes;
