import { Router }  from 'express';
import * as procedures from '../procedures/categories.proc';

const router = Router();

router.get('/', (req, res )=>{
    procedures.all()
    .then((categories) =>{
        res.send(categories);
    }).catch((e)=>{
        console.log(e);
        res.sendStatus(500);
    });
});

router.get('/:id', (req, res) => {
    procedures.read(req.params.id)
    .then((categories) => {
        res.send(categories);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

export default router;