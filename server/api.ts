import { Router } from 'express';
import contactFormController from './controllers/contact.ctrl';

const router = Router();

router
  .use('/contactforms', contactFormController)


export default router;