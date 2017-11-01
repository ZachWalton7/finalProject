import { Router } from 'express';
import * as procedures from '../procedures/trucks.proc';

const router = Router();

router.get('/', (req, res) => {
    procedures.all()
    .then((trucks) => {
        res.send(trucks);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    procedures.create(req.body.category, req.body.name, req.body.description, req.body.imageurl, req.body.menuimg)
    .then((response) => {
        res.send(response);
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

router.put('/:id', (req, res) => {
    procedures.update(req.params.id, req.body.category, req.body.name, req.body.description, req.body.imageurl, req.body.menuimg)
    .then(() => {
        res.sendStatus(204);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.get('/categories/:id', (req, res) => {
    procedures.read(req.params.id)
    .then((post) => {
        res.send(post);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

export default router;