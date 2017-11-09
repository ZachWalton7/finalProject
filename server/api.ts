import { Router } from 'express';
import categoriesController from './controllers/categories.ctrl';
import donationsController from './controllers/donations.ctrl';
import scheduleController from './controllers/schedule.ctrl';
import stripeController from './controllers/stripe.ctrl';
import trucksController from './controllers/trucks.ctrl';
import contactFormController from './controllers/contact.ctrl';
import usersController from './controllers/users.ctrl';
import menuController from './controllers/menu.ctrl';
import itemsController from './controllers/allMenuItems.ctrl'

const router = Router();

router.use('/categories', categoriesController);
router.use('/donations', donationsController);
router.use('/schedule', scheduleController);
router.use('/stripe', stripeController);
router.use('/trucks', trucksController);
router.use('/contactforms', contactFormController)
router.use('/users', usersController);
router.use('/menu', menuController);
router.use('/all', itemsController)


export default router;