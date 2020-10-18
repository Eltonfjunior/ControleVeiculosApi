import express from 'express';
import controller from '../controllers/carController.js';

const app = express();

app.post('/car/create/', controller.create);
app.get('/car/findall/', controller.findAll);
app.get('/car/findebyid/', controller.findOne);
app.put('/car/update/', controller.update);
app.delete('/car/delete/', controller.remove);
app.delete('/car/deleteall/', controller.removeAll);

export { app as carRouter };
