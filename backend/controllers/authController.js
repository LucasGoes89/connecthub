const conectarBanco = require("../database/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function cadastrar(req, res) {

    try {

        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {

            return res.status(400).json({
                erro: "Preencha todos os campos."
            });

        }

        const db = await conectarBanco();

        const usuarioExistente = await db.get(
            "SELECT * FROM usuarios WHERE email = ?",
            [email]
        );

        if (usuarioExistente) {

            return res.status(409).json({
                erro: "E-mail já cadastrado."
            });

        }

        const senhaHash = await bcrypt.hash(senha, 10);

        await db.run(

            `INSERT INTO usuarios
            (nome,email,senha)
            VALUES(?,?,?)`,

            [
                nome,
                email,
                senhaHash
            ]

        );

        return res.status(201).json({

            mensagem: "Usuário criado com sucesso."

        });

    }

    catch (erro) {

    console.error("ERRO COMPLETO:");
    console.error(erro);

    return res.status(500).json({

        erro: erro.message

    });

}

}

module.exports = {

    cadastrar,

    login

};

async function login(req, res) {

    try {

        const { email, senha } = req.body;

        if (!email || !senha) {

            return res.status(400).json({

                erro: "Informe email e senha."

            });

        }

        const db = await conectarBanco();

        const usuario = await db.get(

            "SELECT * FROM usuarios WHERE email = ?",

            [email]

        );

        if (!usuario) {

            return res.status(401).json({

                erro: "Usuário não encontrado."

            });

        }

        const senhaValida = await bcrypt.compare(

            senha,

            usuario.senha

        );

        if (!senhaValida) {

            return res.status(401).json({

                erro: "Senha incorreta."

            });

        }

        const token = jwt.sign(

            {

                id: usuario.id,

                nome: usuario.nome,

                email: usuario.email

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "8h"

            }

        );

        return res.json({

            mensagem: "Login realizado.",

            token

        });

    }

    catch (erro) {

        console.log(erro);

        return res.status(500).json({

            erro: erro.message

        });

    }

}