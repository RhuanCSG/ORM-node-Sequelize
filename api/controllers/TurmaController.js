const database = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class TurmaController {
  static async listaTodasTurmas(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};
    data_inicial || data_final ? where.data_inicio = {} : null
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
    data_final ? where.data_inicio[Op.lte] = data_final : null
    try {
      const todasTurmas = await database.Turmas.findAll({ where });
      return res.status(200).json(todasTurmas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async buscaTurmaPorId(req, res) {
    const { id } = req.params;
    try {
      const turma = await database.Turmas.findOne({
        where: { id: Number(id) },
      });
      res.status(200).json(turma);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async criaTurma(req, res) {
    const turma = req.body;
    try {
      const novaTurma = await database.Turmas.create(turma);
      return res.status(201).json(novaTurma);
    } catch (error) {
      res.status(500).json(error.messgae);
    }
  }

  static async atualizaTurma(req, res) {
    const turma = req.body;
    const { id } = req.params;
    try {
      await database.Turmas.update(turma, { where: { id: Number(id) } });
      const turmaAtualizada = await database.Turmas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(turmaAtualizada);
    } catch (error) {
      res.status(500).json(error.messgae);
    }
  }

  static async deletaTurmaPorId(req, res) {
    const { id } = req.params;
    try {
      const turma = await database.Turmas.destroy({
        where: { id: Number(id) },
      });
      res.status(200).json({ mensagem: `Id ${id} deletado` });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async restauraTurma(req, res) {
    const { id } = req.params;
    try {
      await database.Turmas.restore({
        where: {
          id: Number(id),
        },
      });

      return res
        .status(200)
        .json({ mensagem: `A turma ${id} foi restaurado!` });
    } catch (error) {
      res.status(500).json(error.messgae);
    }
  }
}

module.exports = TurmaController;
