const { Router } = require("express");
const TurmaController = require("../controllers/TurmaController");

const router = Router();

router
  .get("/turmas", TurmaController.listaTodasTurmas)
  .get("/turmas/:id", TurmaController.buscaTurmaPorId)
  .post("/turmas", TurmaController.criaTurma)
  .post("/turmas/:id/restaura", TurmaController.restauraTurma)
  .put("/turmas/:id", TurmaController.atualizaTurma)
  .delete("/turmas/:id", TurmaController.deletaTurmaPorId);
module.exports = router;
