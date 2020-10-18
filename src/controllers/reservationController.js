import { db } from '../models/index.js';
import carController from './carController.js';
import driverController from './driverController.js';

const Reservation = db.reservationModel;

//Insere Registro de uso de veiculo.
const create = async (req, res) => {
  const reservetion = new Reservation({
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    idDriver: req.body.idDriver,
    idCar: req.body.idCar,
    reason: req.body.reason,
    status: req.body.status,
  });

  try {
    const searchReservationDriver = await searchDriverReservationActive(
      req.body.idDriver
    );
    const searchReservationCar = await searchCarReservationActive(
      req.body.idCar
    );

    if (searchReservationDriver && searchReservationCar) {
      res.send({ message: 'Veiculo em uso e motorista em reserva!' });
    } else if (searchReservationDriver && !searchReservationCar) {
      res.send({ message: 'Motorista em reserva!' });
    } else if (!searchReservationDriver && searchReservationCar) {
      res.send({ message: 'Veiculo em uso!' });
    } else {
      const data = await reservetion.save();
      res.send({ message: 'Reserva inserida com sucesso!' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
};

// Busca todas reservas de utilização dos veículos
const findAll = async (req, res) => {
  try {
    const data = await Reservation.find();

    if (!data) {
      res.status(404).send({ message: 'Nao encontrado nenhuma reserva!' });
    } else {
      for (let i = 0; i < data.length; i++) {
        //let driver = await driverController.findDriveById(data[i].idDriver);
        //let car = await carController.findCarById(data[i].idCar);
        //data[i].car = car;
        //data[i].driver = driver;
      }

      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os motorista!' });
  }
};

//Finaliza uso de veículos por motorista.
const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para finalizacao vazios!',
    });
  }

  const id = req.query.id;

  try {
    const data = await Reservation.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!data) {
      res.status(404).send({
        message:
          'Nao encontrado nenhuma reserva com id: ' + id + 'para atualizar!',
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    console.log('catch', error);
    res.status(500).send({ message: 'Erro ao finalizar reserva id: ' + id });
  }
};

async function searchDriverReservationActive(idDriver) {
  try {
    const data = await Reservation.find({
      idDriver: idDriver,
      status: true,
      endDate: null,
    });
    if (data.length < 1) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return true;
  }
}

async function searchCarReservationActive(idCar) {
  try {
    const data = await Reservation.find({
      idCar: idCar,
      status: true,
      endDate: null,
    });
    if (data.length < 1) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return true;
  }
}

export default {
  create,
  findAll,
  update,
};