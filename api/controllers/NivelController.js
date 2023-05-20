// const database = require("../models");

const Service = require("../services/Service.js");
const niveisService = new Service("Niveis");

class NivelController {
  static async listaTodosNiveis(req, res) {
    try {
      const todosNiveis = await niveisService.listaTodosRegistros();
      return res.status(200).json(todosNiveis);
    } catch (error) {
      return res.status(500).json(error.messgae);
    }
  }

  static async buscaNivelPorId(req, res) {
    const { id } = req.params;
    try {
      const nivel = await database.Niveis.findOne({
        where: { id: Number(id) },
      });
      res.status(200).json(nivel);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async criaNivel(req, res) {
    const nivel = req.body;
    try {
      const novoNivel = await database.Niveis.create(nivel);
      return res.status(201).json(novoNivel);
    } catch (error) {
      res.status(500).json(error.messgae);
    }
  }

  static async atualizaNivel(req, res) {
    const nivel = req.body;
    const { id } = req.params;
    try {
      await database.Niveis.update(nivel, { where: { id: Number(id) } });
      const nivelAtualizado = await database.Niveis.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(nivelAtualizado);
    } catch (error) {
      res.status(500).json(error.messgae);
    }
  }

  static async deletaNivelPorId(req, res) {
    const { id } = req.params;
    try {
      const nivel = await database.Niveis.destroy({
        where: { id: Number(id) },
      });
      res.status(200).json({ mensagem: `Id ${id} deletado` });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async restauraNivel(req, res) {
    const { id } = req.params;
    try {
      await database.Niveis.restore({
        where: {
          id: Number(id),
        },
      });

      return res
        .status(200)
        .json({ mensagem: `O nível ${id} foi restaurado!` });
    } catch (error) {
      res.status(500).json(error.messgae);
    }
  }
}

module.exports = NivelController;
