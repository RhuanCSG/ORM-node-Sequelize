// const database = require("../models");
// const Sequelize = require("sequelize");

const { PessoasService } = require("../services/index.js");
const pessoasService = new PessoasService();

class PessoaController {
  static async listaPessoasAtivas(req, res) {
    try {
      const pessoas = await pessoasService.listaRegistrosAtivos();
      return res.status(200).json(pessoas);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async listaTodasPessoas(req, res) {
    try {
      const pessoas = await pessoasService.listaTodosRegistros();
      return res.status(200).json(pessoas);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async buscaPessoaPorId(req, res) {
    const { id } = req.params;
    try {
      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      res.status(200).json(pessoa);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async criaPessoa(req, res) {
    const pessoa = req.body;
    try {
      const novaPessoa = await database.Pessoas.create(pessoa);
      return res.status(201).json(novaPessoa);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async atualizaPessoa(req, res) {
    const pessoa = req.body;
    const { id } = req.params;
    try {
      await database.Pessoas.update(pessoa, { where: { id: Number(id) } });
      const pessoaAtualizada = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(pessoaAtualizada);
    } catch (error) {
      res.status(500).json(error.messgae);
    }
  }

  static async deletaPessoaPorId(req, res) {
    const { id } = req.params;
    try {
      const pessoa = await database.Pessoas.destroy({
        where: { id: Number(id) },
      });
      res.status(200).json({ mensagem: `Id ${id} deletado` });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async restauraPessoa(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.restore({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json({ mensagem: `id ${id} restaurado !` });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async buscaMatriculaPorEstudante(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const matricula = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      return res.status(200).json(matricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async buscaTurmasCheias(req, res) {
    const lotacaoTurma = 2;
    try {
      const turmasCheias = await database.Matriculas.findAndCountAll({
        where: {
          status: "confirmado",
        },
        attributes: ["turma_id"],
        group: ["turma_id"],
        having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`),
      });
      return res.status(200).json(turmasCheias.count);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async buscaMatriculaPorTurma(req, res) {
    const { turmaId } = req.params;
    try {
      const matriculas = await database.Matriculas.findAndCountAll({
        where: {
          turma_id: Number(turmaId),
          status: "confirmado",
        },
        limit: 20,
        order: [["estudante_id", "ASC"]],
      });
      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criaMatricula(req, res) {
    const { estudanteId } = req.params;
    const matricula = { ...req.body, estudante_id: Number(estudanteId) };
    try {
      const novaMatricula = await database.Matriculas.create(matricula);
      return res.status(201).json(novaMatricula);
    } catch (error) {
      res.status(500).json(error.messgae);
    }
  }

  static async atualizaMatricula(req, res) {
    const matricula = req.body;
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Matriculas.update(matricula, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      const matriculaAtualizada = await database.Matriculas.findOne({
        where: { id: Number(matriculaId) },
      });
      return res.status(200).json(matriculaAtualizada);
    } catch (error) {
      res.status(500).json(error.messgae);
    }
  }

  static async deletaMatriculaPorId(req, res) {
    const { matriculaId } = req.params;
    try {
      const matricula = await database.Matriculas.destroy({
        where: {
          id: Number(matriculaId),
        },
      });
      res.status(200).json({ mensagem: `Id ${matriculaId} deletado` });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async restauraMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Matriculas.restore({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      return res
        .status(200)
        .json({ mensagem: `Matrícula ${matriculaId} restaurada!` });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async buscaMatriculas(req, res) {
    const { estudanteId } = req.params;
    try {
      const pessoa = await database.Pessoas.findOne({
        where: {
          id: Number(estudanteId),
        },
      });
      const matriculas = await pessoa.getAulasMatriculadas();
      res.status(200).json(matriculas);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async desativaPessoa(req, res) {
    const { estudanteId } = req.params;
    try {
      await pessoasService.desativaPessoasEMatriculas(Number(estudanteId));
      res.status(200).json(`Estudante desativado!`);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = PessoaController;
