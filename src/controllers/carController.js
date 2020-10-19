import { db } from '../models/index.js';
import pkg from 'mongodb';
const { ObjectID } = pkg;

const Car = db.carModel;

//Insere Registro de carros.
const create = async (req, res) => {
  const car = new Car({
    licensePlate: req.body.licensePlate,
    color: req.body.color,
    brand: req.body.brand,
  });

  try {
    const data = await car.save();
    res.send({ message: 'Veículo inserido com sucesso!' });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
};

// Busca Todos os carros cadastrados ou busca por marca
const findAll = async (req, res) => {
  const brand = req.body.brand;
  const color = req.body.color;
  //condicao para o filtro no findAll
  let condition = {};
  if (brand && color) {
    condition = {
      brand: { $regex: new RegExp(brand), $options: 'i' },
      color: { $regex: new RegExp(color), $options: 'i' },
    };
  } else if (brand && !color) {
    condition = {
      brand: { $regex: new RegExp(brand), $options: 'i' },
    };
  } else if (!brand && color) {
    condition = {
      color: { $regex: new RegExp(color), $options: 'i' },
    };
  }

  try {
    const data = await Car.find(condition);

    if (!data) {
      res.status(404).send({ message: 'Nao encontrado nenhum veículo!' });
    } else {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os veículos!' });
  }
};

//Busca veículo por ID
const findOne = async (req, res) => {
  const id = req.query.id;
  try {
    const data = await Car.findById({ _id: id });

    if (!data) {
      res.status(404).send({
        message: 'Nao encontrado nenhuma Veículo com o ID pesquisado! id:' + id,
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Veículo - id: ' + id });
  }
};

//Atualizar veículo.
const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazios!',
    });
  }

  const id = req.query.id;

  try {
    const data = await Car.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!data) {
      res.status(404).send({
        message:
          'Nao encontrado nenhum Veículo com id: ' + id + 'para atualizar!',
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Veículo id: ' + id });
  }
};

//Remove Um veículo.
const remove = async (req, res) => {
  const id = req.query.id;
  try {
    const data = await Car.findByIdAndRemove({ _id: id });

    if (!data) {
      res.status(404).send({
        message:
          'Nao encontrado nenhum veiculo com o id : ' + id + ' para excluir!',
      });
    } else {
      res.send({ message: 'Veiculo excluido com sucesso!' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o veiculo id: ' + id });
  }
};

//Remove todas... Ok.
const removeAll = async (req, res) => {
  try {
    const data = await Car.deleteMany();

    if (!data) {
      res.status(404).send('Nao encontrado nenhum veiculo para excluir');
    } else {
      res.send('Veiculos excluidos com sucesso');
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as veiculos' });
  }
};

//Busca e retorna Carro por ID
async function findCarById(id) {
  return await Car.findById({ _id: ObjectID(id) }, { _id: 0, __v: 0 });
}

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
  removeAll,
  findCarById,
};
