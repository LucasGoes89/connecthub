const conectarBanco = require("../database/database");

// ===============================
// LISTAR TRANSAÇÕES
// ===============================

async function listarTransacoes(req, res) {

    try {

        const db = await conectarBanco();

        const transacoes = await db.all(

            `SELECT *
             FROM transacoes
             WHERE usuario_id = ?
             ORDER BY id DESC`,

            [req.usuario.id]

        );

        res.json(transacoes);

    }

    catch (erro) {

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

        const usuario_id = req.usuario.id;

        const resultado = await db.run(

            `INSERT INTO transacoes
            (
                descricao,
                valor,
                tipo,
                categoria,
                data,
                usuario_id
            )
            VALUES
            (
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            )`,

            [

                descricao,
                valor,
                tipo,
                categoria,
                data,
                usuario_id

            ]

        );

        res.status(201).json({

            id: resultado.lastID,
            descricao,
            valor,
            tipo,
            categoria,
            data,
            usuario_id

        });

    }

    catch (erro) {

        console.error(erro);

        res.status(500).json({

            erro: "Erro ao cadastrar."

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

        const resultado = await db.run(

            `UPDATE transacoes
             SET descricao = ?,
                 valor = ?,
                 tipo = ?,
                 categoria = ?,
                 data = ?
             WHERE id = ?
             AND usuario_id = ?`,

            [

                descricao,
                valor,
                tipo,
                categoria,
                data,
                id,
                req.usuario.id

            ]

        );

        if (resultado.changes === 0) {

            return res.status(404).json({

                erro: "Transação não encontrada."

            });

        }

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

// ===============================
// EXCLUIR TRANSAÇÃO
// ===============================

async function excluirTransacao(req, res) {

    try {

        const db = await conectarBanco();

        const id = req.params.id;

        const resultado = await db.run(

            `DELETE FROM transacoes
             WHERE id = ?
             AND usuario_id = ?`,

            [

                id,
                req.usuario.id

            ]

        );

        if (resultado.changes === 0) {

            return res.status(404).json({

                erro: "Transação não encontrada."

            });

        }

        res.json({

            mensagem: "Transação removida com sucesso."

        });

    }

    catch (erro) {

        console.error(erro);

        res.status(500).json({

            erro: "Erro ao excluir."

        });

    }

}

module.exports = {

    listar: listarTransacoes,

    criar: adicionarTransacao,

    atualizar: editarTransacao,

    excluir: excluirTransacao

};