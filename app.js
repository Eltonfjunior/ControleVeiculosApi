import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { reservationRouter } from './routes/reservationRouter.js';
import { carRouter } from './routes/carRouter.js';
import { driverRouter } from './routes/driverRouter.js';
import { db } from './models/index.js';
import dotenv from 'dotenv';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log('Conectado com o mongodb com sucesso');
  } catch (error) {
    console.log('Erro ao conectar no mongodb ' + error);
  }
})();

const app = express();

/**
 * Faz a leitura do arquivo
 * ".env" por padrão
 */
dotenv.config();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(driverRouter);
app.use(carRouter);
app.use(reservationRouter);
app.get('/', (req, res) => {
  res.send('API em execucao');
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Servidor em execucao na porta ${PORT}`);
});
