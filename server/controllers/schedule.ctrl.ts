import { Router } from 'express';
import * as procedures from '../procedures/schedule.proc';

const router = Router();

router.get('/', (req, res) => {
    procedures.all()
    .then((schedule) => {
        res.send(schedule);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    procedures.create(req.body.location, req.body.locationname, req.body.dayofweek, req.body.lunchdinner, req.body.lat, req.body.lng)
    .then((response) => {
        res.send(response);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.get('/:id', (req, res) => {
    procedures.read(req.params.id)
    .then((schedule) => {
        res.send(schedule);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
    procedures.update(req.params.id, req.body.location, req.body.locationname, req.body.dayofweek, req.body.lunchdinner, req.body.lat, req.body.lng)
    .then(() => {
        res.sendStatus(204);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

export default router;