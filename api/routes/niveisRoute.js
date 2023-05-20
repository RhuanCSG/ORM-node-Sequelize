const { Router } = require("express");
const NivelController = require("../controllers/NivelController");

const router = Router();

router
  .get("/niveis", NivelController.listaTodosNiveis)
  .get("/niveis/:id", NivelController.buscaNivelPorId)
  .post("/niveis", NivelController.criaNivel)
  .post("/niveis/:id/restaura", NivelController.restauraNivel)
  .put("/niveis/:id", NivelController.atualizaNivel)
  .delete("/niveis/:id", NivelController.deletaNivelPorId);
module.exports = router;
