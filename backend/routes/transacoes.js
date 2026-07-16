const express = require("express");

const router = express.Router();

const autenticar =
require("../middleware/auth");

const controller =
require("../controllers/transacaoController");

// =========================

router.get(
    "/",
    autenticar,
    controller.listar
);

// =========================

router.post(
    "/",
    autenticar,
    controller.criar
);

router.put(
    "/:id",
    autenticar,
    controller.atualizar
);

router.delete(
    "/:id",
    autenticar,
    controller.excluir
);

module.exports = router;