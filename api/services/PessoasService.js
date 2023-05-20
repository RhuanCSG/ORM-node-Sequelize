const Service = require("./Service.js");
const database = require("../models");

class PessoasService extends Service {
  constructor() {
    super("Pessoas");
    this.matriculas = new Service("Matriculas");
  }

  async listaRegistrosAtivos(where = {}) {
    return database[this.modelo].findAll({ where: { ...where } });
  }

  async listaTodosRegistros(where = {}) {
    return database[this.modelo]
      .scope("todos")
      .findAll({ where: { ...where } });
  }

  async desativaPessoasEMatriculas(estudanteId) {
    return database.sequelize.transaction(async transacao => {
      await super.atualizaRegistro({ ativo: false }, estudanteId, { transaction: transacao });
      await this.matriculas.atualizaRegistros(
        { status: "cancelado" },
        { estudante_id: estudanteId },
        { transaction: transacao }
      );
    });
  }
}

module.exports = PessoasService;
