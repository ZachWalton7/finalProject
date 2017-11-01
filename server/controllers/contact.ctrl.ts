import * as express from 'express';
import { sendEmail } from '../services/email.svc'

const router = express.Router();

// api/contact
router.post('/', (req, res) => {
    sendEmail('davidmiller963@gmail.com', req.body.from, 'New Contact Form Submission', req.body.message)
    .then((response) => {
        res.sendStatus(201);
    }).catch((e) => {
        console.log(e.response.body.errors);
        res.sendStatus(500);
    })
});

export default router;