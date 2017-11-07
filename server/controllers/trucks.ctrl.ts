import { Router } from 'express';
import * as procedures from '../procedures/trucks.proc';
import * as auth from '../middleware/auth.mw';

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

router.get('/:id', (req, res) => {
    procedures.read(req.params.id)
    .then((trucks) => {
        res.send(trucks);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.get('/categories/:id', (req, res) => {
    procedures.categoryread(req.params.id)
    .then((trucks) => {
        res.send(trucks);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.get('/users/:id', (req, res) => {
    procedures.userread(req.params.id)
    .then((trucks) => {
        res.send(trucks);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.all('*', auth.isLoggedIn);

router.post('/', (req, res) => {
    procedures.create(req.body.userid, req.body.categoryid, req.body.name, req.body.description, req.body.imgone, req.body.imgtwo, req.body.imgthree)
    .then((response) => {
        res.send(response);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
    procedures.update(req.params.id, req.body.userid, req.body.categoryid, req.body.name, req.body.description, req.body.imgone, req.body.imgtwo, req.body.imgthree)
    .then(() => {
        res.sendStatus(204);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

export default router;