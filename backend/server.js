const express = require("express");
const cors = require("cors");
require("dotenv").config();

const transacaoRoutes = require("./routes/transacaoRoutes");

const app = express();

app.use(cors());

app.use(express.json());

// =====================

app.get("/", (req, res) => {

    res.json({

        projeto: "SmartCash",

        status: "API funcionando 🚀"

    });

});

// =====================

app.use("/transacoes", transacaoRoutes);

// =====================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Servidor rodando na porta ${PORT}`);

});