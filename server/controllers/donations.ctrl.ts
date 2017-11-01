import { Router } from 'express';
import * as procedures from '../procedures/donations.proc';

const router = Router();


router.get('/', (req, res) => {
    procedures.all()
    .then((donations) => {
        res.send(donations);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.get('/:id', (req, res) => {
    procedures.read(req.params.id)
    .then((post) => {
        res.send(post);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    procedures.create(req.body.amount, req.body.stripetransactionid)
    .then((response) => {
        res.send(response);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});
export default router;