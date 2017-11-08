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

router.get('/:id', (req, res) => {
    procedures.single(req.params.id)
    .then((menu) => {
        res.send(menu);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

 router.put('/:id', (req, res) => {
    procedures.update(req.params.idmenus, req.body.item, req.body.cost)
    .then((item) =>{
        res.send(item);
        console.log(item);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    })
});

export default router;