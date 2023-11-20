import { Router } from 'express';
import personController from '../controllers/personController';

const personRoutes = Router();

personRoutes.post('/', personController.create);

export default personRoutes;
