import express from 'express';
import controller from '../controllers/driverController.js';

const app = express();

app.post('/driver/create/', controller.create);
app.get('/driver/findall/', controller.findAll);
app.get('/driver/findebyid/', controller.findOne);
app.put('/driver/update/', controller.update);
app.delete('/driver/delete/', controller.remove);
app.delete('/driver/deleteall/', controller.removeAll);

export { app as driverRouter };
