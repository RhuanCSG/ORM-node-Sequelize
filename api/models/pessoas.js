"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    static associate(models) {
      Pessoas.hasMany(models.Turmas, {
        foreignKey: "docente_id",
      });
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: "estudante_id",
        scope: { status: 'confirmado' },
        as: 'aulasMatriculadas'
      });
    }
  }
  Pessoas.init(
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          validaNome: function (dados) {
            if (dados.length < 3)
              throw new Error(
                "O campo nome deve possuir pelo menos 3 cracteres"
              );
          },
        },
      },
      ativo: DataTypes.BOOLEAN,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "E-mail inválido!",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      defaultScope: {
        where: { ativo: true },
      },
      scopes: {
        todos: {
          where: {},
        },
      },
      modelName: "Pessoas",
    }
  );
  return Pessoas;
};
