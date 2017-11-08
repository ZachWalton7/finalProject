import { Router } from 'express';
import * as procedures from '../procedures/menu.proc';

const router = Router();

router.get('/:id', (req, res) => {
    procedures.menu(req.params.id)
    .then((menu) => {
        res.send(menu);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

export default router;