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

router.get('/daily', (req, res) => {
    procedures.daily()
    .then((schedule) => {
        res.send(schedule);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.get('/daily/:id', (req, res) => {
    procedures.read(req.params.id)
    .then((schedule) => {
        res.send(schedule);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});


// Gets single truck Schedule

router.get('/:id', (req, res) => {
    procedures.singleTruckSchedule(req.params.id)
    .then((schedules) => {
        res.send(schedules);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
    procedures.update(req.params.id, req.body.location, req.body.locationname, req.body.dayofweek, req.body.lunchdinner, req.body.lat, req.body.lng, req.body.open, req.body.close)
    .then(() => {
        res.sendStatus(204);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

// Gets single truck Schedule

router.get('/single/:id', (req, res) => {
    procedures.singleSchedule(req.params.id)
    .then((schedules) => {
        res.send(schedules);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.put('/single/:id', (req, res) => {
    procedures.update(req.params.id, req.body.location, req.body.locationname, req.body.dayofweek, req.body.lunchdinner, req.body.lat, req.body.lng, req.body.open, req.body.close)
    .then(() => {
        res.sendStatus(204);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

export default router;