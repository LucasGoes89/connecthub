const conectarBanco = require("../database/database");

// ===============================
// LISTAR TRANSAÇÕES
// ===============================

async function listarTransacoes(req, res) {

    try {

        const db = await conectarBanco();

        const transacoes = await db.all(
            "SELECT * FROM transacoes ORDER BY id DESC"
        );

        res.json(transacoes);

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao listar transações."
        });

    }

}

// ===============================
// ADICIONAR TRANSAÇÃO
// ===============================

async function adicionarTransacao(req, res) {

    try {

        const db = await conectarBanco();

        const {

            descricao,

            valor,

            tipo,

            categoria,

            data

        } = req.body;

        const resultado = await db.run(

            `INSERT INTO transacoes
            (descricao, valor, tipo, categoria, data)

            VALUES (?, ?, ?, ?, ?)`,

            [descricao, valor, tipo, categoria, data]

        );

        res.status(201).json({

            id: resultado.lastID,
            descricao,
            valor,
            tipo

        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao cadastrar."
        });

    }

}

// ===============================
// EXCLUIR
// ===============================

async function excluirTransacao(req, res) {

    try {

        const db = await conectarBanco();

        const id = req.params.id;

        await db.run(

            "DELETE FROM transacoes WHERE id = ?",

            [id]

        );

        res.json({

            mensagem: "Transação removida."

        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({

            erro: "Erro ao excluir."

        });

    }

}
// ===============================
// EDITAR TRANSAÇÃO
// ===============================

async function editarTransacao(req, res) {

    try {

        const db = await conectarBanco();

        const id = req.params.id;

        const {
            descricao,
            valor,
            tipo,
            categoria,
            data
        } = req.body;

        await db.run(

            `UPDATE transacoes
             SET descricao = ?,
                 valor = ?,
                 tipo = ?,
                 categoria = ?,
                 data = ?
             WHERE id = ?`,

            [
                descricao,
                valor,
                tipo,
                categoria,
                data,
                id
            ]

        );

        res.json({
            mensagem: "Transação atualizada com sucesso!"
        });

    }

    catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao atualizar."
        });

    }

}

module.exports = {

    listarTransacoes,
    adicionarTransacao,
    editarTransacao,
    excluirTransacao

};