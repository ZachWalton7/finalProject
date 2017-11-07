import { Router } from 'express';
import * as passport from 'passport';
import * as procedures from '../procedures/users.proc';
import * as utils from '../utils';
import * as auth from '../middleware/auth.mw';

const router = Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err: any, user: models.IUser, info: any) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!user) {
            return res.status(401).send(info);
        }
        req.logIn(user, (err) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            } else {
                delete user.password;
                return res.send(user);
            }
        });
    })(req, res, next);
})
router.get('/', (req, res) => {
    procedures.all()
    .then((users) => {
        res.send(users);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.all('*', auth.isLoggedIn);



router.post('/', (req, res) => {
    utils.encryptPassword(req.body.password)
    .then((hash) => {
        return procedures.create(req.body.username, req.body.email, hash);
    }).then((id) => {
        res.send(id);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.get('/me', (req, res) => {
    res.send(req.user);
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(() => {
            req.logOut();
            res.sendStatus(204);
        });
    }
});

export default router;