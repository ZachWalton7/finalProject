import { Router } from 'express';
import * as procedures from '../procedures/menu.proc';

const router = Router();

// gets all menu items across all trucks (might not be useful)
router.get('/', (req, res) => {
    procedures.all()
    .then((menu) => {
        res.send(menu);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
})
.post('/', (req, res) => {
    procedures.create(req.body.foodTruckId, req.body.item, req.body.cost)
    .then((response) => {
        res.send(response);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

// get all menu items for a specific truck
// actually /api/menu/truck/:foodTruckId
router.get('/truck/:foodTruckId', (req, res) => {
    procedures.menu(req.params.foodTruckId)
    .then((menu) => {
        res.send(menu);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

// GET, PUT, DELETE single menu item by id

router.get('/:id', (req, res) => {
    procedures.single(req.params.id)
    .then((menu) => {
        res.send(menu);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
})

router.put('/:id', (req, res) => {
    procedures.update(req.body.idmenus, req.body.item, req.body.cost)
    .then(() => {
        res.sendStatus(204);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
})

// router.get('/:truckid/:menuid', (req, res) => {
//     procedures.menu(req.params.id)
//     .then((menu) => {
//         res.send(menu);
//     }).catch((e) => {
//         console.log(e);
//         res.sendStatus(500);
//     });
// });

export default router;