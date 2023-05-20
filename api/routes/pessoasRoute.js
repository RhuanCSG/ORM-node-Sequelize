const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController.js");

const router = Router();

router
  .get("/pessoas", PessoaController.listaTodasPessoas)
  .get("/pessoas/ativas", PessoaController.listaPessoasAtivas)
  .get("/pessoas/:id", PessoaController.buscaPessoaPorId)
  .get("/pessoas/:estudanteId/matriculas", PessoaController.buscaMatriculas)
  .get(
    "/pessoas/matricula/:turmaId/confirmados",
    PessoaController.buscaMatriculaPorTurma
  )
  .get("/pessoas/matricula/lotado", PessoaController.buscaTurmasCheias)
  .get(
    "/pessoas/:estudanteId/matriculas/:matriculaId",
    PessoaController.buscaMatriculaPorEstudante
  )
  .put("/pessoas/:id", PessoaController.atualizaPessoa)
  .put(
    "/pessoas/:estudanteId/matriculas/:matriculaId",
    PessoaController.atualizaMatricula
  )
  .post("/pessoas", PessoaController.criaPessoa)
  .post("/pessoas/:id/restaura", PessoaController.restauraPessoa)
  .post("/pessoas/:estudanteId/matriculas", PessoaController.criaMatricula)
  .post(
    "/pessoas/:estudanteId/matriculas/:matriculaId/restaura",
    PessoaController.restauraMatricula
  )
  .post("/pessoas/:estudanteId/desativaCadastro", PessoaController.desativaPessoa)
  .delete("/pessoas/:id", PessoaController.deletaPessoaPorId)
  .delete(
    "/pessoas/matriculas/:matriculaId",
    PessoaController.deletaMatriculaPorId
  );

module.exports = router;
