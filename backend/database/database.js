const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

async function conectarBanco() {

    const db = await open({

        filename: path.join(__dirname, "../data/smartcash.db"),

        driver: sqlite3.Database

    });

    await db.exec(`

        CREATE TABLE IF NOT EXISTS transacoes(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            descricao TEXT NOT NULL,

            valor REAL NOT NULL,

            tipo TEXT NOT NULL,

            categoria TEXT NOT NULL,

            data TEXT NOT NULL

        );

    `);

    return db;

}

module.exports = conectarBanco;