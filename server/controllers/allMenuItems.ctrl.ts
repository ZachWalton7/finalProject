import { Router } from 'express';
import * as procedures from '../procedures/allMenuItems.proc';

const router = Router();

router.get('/', (req, res) => {
    procedures.all()
    .then((menu) => {
        res.send(menu);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.get('/:idmenus', (req, res) => {
    procedures.single(req.params.idmenus)
    .then((menu) => {
        res.send(menu);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
})

   .put('/:idmenus', (req, res) => {
    procedures.update(req.params.idmenus, req.body.item, req.body.cost)
    .then(() => {
        res.sendStatus(204);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

export default router;