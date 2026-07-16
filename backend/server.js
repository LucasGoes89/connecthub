// ======================================================
// SMARTCASH API
// Desenvolvido por Lucas de Goes
// ======================================================

// ==============================
// IMPORTAÇÕES
// ==============================

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const conectarBanco = require("./database/database");

const authRoutes = require("./routes/authRoutes");
const rotasTransacoes = require("./routes/transacoes");

// ==============================
// APP
// ==============================

const app = express();

// ==============================
// MIDDLEWARES
// (DEVEM VIR ANTES DAS ROTAS)
// ==============================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==============================
// BANCO DE DADOS
// ==============================

conectarBanco();

// ==============================
// ROTA PRINCIPAL
// ==============================

app.get("/", (req, res) => {

    res.status(200).json({

        projeto: "SmartCash API",

        versao: "1.0.0",

        status: "Servidor funcionando 🚀"

    });

});

// ==============================
// ROTAS DA API
// ==============================

app.use("/auth", authRoutes);

app.use("/transacoes", rotasTransacoes);

// ==============================
// ROTA NÃO ENCONTRADA
// ==============================

app.use((req, res) => {

    res.status(404).json({

        erro: "Rota não encontrada."

    });

});

// ==============================
// TRATAMENTO GLOBAL DE ERROS
// ==============================

app.use((erro, req, res, next) => {

    console.error("Erro interno:");

    console.error(erro);

    res.status(500).json({

        erro: "Erro interno do servidor."

    });

});

// ==============================
// SERVIDOR
// ==============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("");

    console.log("===================================");

    console.log("🚀 SMARTCASH API");

    console.log(`Servidor iniciado na porta ${PORT}`);

    console.log(`http://localhost:${PORT}`);

    console.log("===================================");

});