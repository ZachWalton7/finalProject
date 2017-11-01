import { Router } from 'express';
import * as stripeService from '../services/stripe.svc';

const router = Router();

router.post('/', (req, res) => {
    let amount = Number(req.body.amount);
    stripeService.charge(req.body.token, amount)
    .then((success) => {
        console.log(success);
        res.sendStatus(204);
    }).catch((e) => {
        console.log(e);
        res.status(400).send(e.message);
    });
});

export default router; 