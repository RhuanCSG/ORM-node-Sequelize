const database = require("../models");

class Service {
  constructor(modelo) {
    this.modelo = modelo;
  }

  async listaTodosRegistros() {
    return database[this.modelo].findAll();
  }

  async buscaRegistro(id) {
    return database[this.modelo].findOne(id);
  }

  async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
    return database[this.modelo].update(
      dadosAtualizados,
      { where: { id: id } },
      transacao
    );
  }

  async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
    return database[this.modelo].update(
      dadosAtualizados,
      { where: { ... where } },
      transacao
    );
  }

}

module.exports = Service;
