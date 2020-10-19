import { db } from '../models/index.js';
import pkg from 'mongodb';
const { ObjectID } = pkg;

const Driver = db.driverModel;

//Insere Registro de motorista.
const create = async (req, res) => {
  const driver = new Driver({
    name: req.body.name,
  });

  try {
    const data = await driver.save();
    res.send({ message: 'Motorista inserido com sucesso!' });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
};

// Busca Todos os motorista cadastrados ou busca por nome
const findAll = async (req, res) => {
  const name = req.body.name;

  //condicao para o filtro no findAll
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const data = await Driver.find(condition);

    if (!data) {
      res.status(404).send({ message: 'Nao encontrado nenhum motorista!' });
    } else {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os motorista!' });
  }
};

//Busca motorista por ID
const findOne = async (req, res) => {
  const id = req.query.id;
  try {
    const data = await Driver.findById({ _id: id });

    if (!data) {
      res.status(404).send({
        message:
          'Nao encontrado nenhuma motorista com o ID pesquisado! id:' + id,
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o motorista - id: ' + id });
  }
};

//Atualiza motorista.
const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazios!',
    });
  }

  const id = req.query.id;

  try {
    const data = await Driver.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!data) {
      res.status(404).send({
        message:
          'Nao encontrado nenhum motorista com id: ' + id + 'para atualizar!',
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Erro ao atualizar a motorista id: ' + id });
  }
};

//Remove Um motorista.
const remove = async (req, res) => {
  const id = req.query.id;
  try {
    const data = await Driver.findByIdAndRemove({ _id: id });

    if (!data) {
      res.status(404).send({
        message:
          'Nao encontrado nenhum motorista com o id : ' + id + ' para excluir!',
      });
    } else {
      res.send({ message: 'Motorista excluido com sucesso!' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o motorista id: ' + id });
  }
};

//Remove os motoristas.
const removeAll = async (req, res) => {
  try {
    const data = await Driver.deleteMany();

    if (!data) {
      res
        .status(404)
        .send({ message: 'Nao encontrado nenhum motorista para excluir!' });
    } else {
      res.send({ message: 'Motoristas excluidos com sucesso!' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as motorista!' });
  }
};

//Busca e retorna motorista por ID.
async function findDriveById(id) {
  return await Driver.findById({ _id: ObjectID(id) }, { _id: 0, __v: 0 });
}

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
  removeAll,
  findDriveById,
};
