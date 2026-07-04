const express = require("express");

const router = express.Router();

const controller =
require("../controllers/transacaoController");

// =========================

router.get(
    "/",
    controller.listarTransacoes
);

// =========================

router.post(
    "/",
    controller.adicionarTransacao
);

// =========================

router.put(
    "/:id",
    controller.editarTransacao
);

router.delete(
    "/:id",
    controller.excluirTransacao
);

module.exports = router;