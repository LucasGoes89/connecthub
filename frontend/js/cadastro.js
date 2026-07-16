// ======================================================
// SMARTCASH
// CADASTRO
// ======================================================

const API_URL = "http://localhost:3000";

// ======================================================

const form =
document.getElementById("form-cadastro");

const nomeInput =
document.getElementById("nome");

const emailInput =
document.getElementById("email");

const senhaInput =
document.getElementById("senha");

const mensagem =
document.getElementById("mensagem");

// ======================================================

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    mensagem.textContent = "";

    const nome =
    nomeInput.value.trim();

    const email =
    emailInput.value.trim();

    const senha =
    senhaInput.value.trim();

    if(nome==="" || email==="" || senha===""){

        mensagem.textContent =
        "Preencha todos os campos.";

        return;

    }

    try{

        const resposta = await fetch(

            `${API_URL}/auth/cadastro`,

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    nome,
                    email,
                    senha

                })

            }

        );

        const dados =
        await resposta.json();

        if(!resposta.ok){

            mensagem.textContent =
            dados.erro;

            return;

        }

        mensagem.style.color = "green";

        mensagem.textContent =
        "Cadastro realizado com sucesso!";

        setTimeout(()=>{

            window.location.href =
            "login.html";

        },1500);

    }

    catch(erro){

        console.error(erro);

        mensagem.textContent =
        "Erro ao conectar ao servidor.";

    }

});

// ======================================================
// SE JÁ ESTIVER LOGADO
// ======================================================

const token =
localStorage.getItem("token");

if(token){

    window.location.href =
    "index.html";

}