const express = require("express");
const cors = require("cors");
require("dotenv").config();

const conectarBanco = require("./database/database");
const rotasTransacoes = require("./routes/transacoes");

const app = express();

app.use(cors());
app.use(express.json());

// Cria o banco automaticamente
conectarBanco();

// =============================

app.get("/", (req, res) => {

    res.json({

        projeto: "SmartCash API",
        status: "Funcionando 🚀"

    });

});

// =============================

app.use("/transacoes", rotasTransacoes);

// =============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Servidor rodando na porta ${PORT}`);

});