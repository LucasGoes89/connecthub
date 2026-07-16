// ======================================================
// SMARTCASH
// LOGIN
// ======================================================

const API_URL = "http://localhost:3000";

// ======================================================

const form =
document.getElementById("form-login");

const emailInput =
document.getElementById("email");

const senhaInput =
document.getElementById("senha");

const mensagemErro =
document.getElementById("mensagem-erro");

// ======================================================

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    mensagemErro.textContent = "";

    const email =
    emailInput.value.trim();

    const senha =
    senhaInput.value.trim();

    try {

        const resposta = await fetch(

            `${API_URL}/auth/login`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    email,
                    senha

                })

            }

        );

        const dados =
        await resposta.json();

        if (!resposta.ok) {

            mensagemErro.textContent =
            dados.erro || "Erro ao realizar login.";

            return;

        }

        // ==========================================
        // SALVA O TOKEN
        // ==========================================

        localStorage.setItem(

            "token",

            dados.token

        );

        // ==========================================
        // REDIRECIONA
        // ==========================================

        window.location.href = "index.html";

    }

    catch (erro) {

        console.error(erro);

        mensagemErro.textContent =
        "Não foi possível conectar ao servidor.";

    }

});

// ======================================================
// SE JÁ ESTIVER LOGADO
// ======================================================

const token =
localStorage.getItem("token");

if (token) {

    window.location.href = "index.html";

}