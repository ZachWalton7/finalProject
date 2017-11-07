import { Router } from 'express';
import * as procedures from '../procedures/menu.proc';

const router = Router();

router.get('/:id/:menuid', (req, res) => {
    procedures.single(req.params.id, req.params.menuid)
    .then((menu) => {
        res.send(menu);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

 router.put('/:id/:menuid', (req, res) => {
    procedures.update(req.body.idmenus, req.body.item, req.body.cost)
    .then((item) =>{
        res.send(item);
        console.log(item);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    })
});

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