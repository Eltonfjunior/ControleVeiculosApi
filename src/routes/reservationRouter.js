import express from 'express';
import controller from '../controllers/reservationController.js';

const app = express();

app.post('/reservation/create/', controller.create);
app.get('/reservation/findall/', controller.findAll);
app.put('/reservation/finish/', controller.update);

export { app as reservationRouter };
