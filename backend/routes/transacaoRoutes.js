const express = require("express");

const router = express.Router();

const {

    listarTransacoes,

    adicionarTransacao,

    excluirTransacao

} = require("../controllers/transacaoController");

// =====================

router.get("/", listarTransacoes);

router.post("/", adicionarTransacao);

router.delete("/:id", excluirTransacao);

module.exports = router;