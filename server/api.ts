import { Router } from 'express';
import categoriesController from './controllers/categories.ctrl';
import donationsController from './controllers/donations.ctrl';
import scheduleController from './controllers/schedule.ctrl';
import stripeController from './controllers/stripe.ctrl';
import trucksController from './controllers/trucks.ctrl';

const router = Router();

router.use('/categories', categoriesController);
router.use('/donations', donationsController);
router.use('/schedule', scheduleController);
router.use('/stripe', stripeController);
router.use('/trucks', trucksController);

export default router;