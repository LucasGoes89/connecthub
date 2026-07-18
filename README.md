# 💰 SmartCash - Dashboard Financeiro

![Status](https://img.shields.io/badge/status-Concluído-success)
![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![Express](https://img.shields.io/badge/Express-4.x-black)
![SQLite](https://img.shields.io/badge/SQLite-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

## 📖 Sobre o projeto

O **SmartCash** é uma aplicação web para controle financeiro pessoal, desenvolvida como projeto da disciplina de Desenvolvimento Web.

O sistema permite que cada usuário gerencie suas próprias finanças de forma segura, realizando o cadastro de receitas e despesas, visualizando gráficos financeiros e acompanhando seu saldo em tempo real.

O projeto foi desenvolvido utilizando **HTML**, **CSS**, **JavaScript**, **Node.js**, **Express**, **SQLite** e autenticação utilizando **JWT (JSON Web Token)**.

---

## 🚀 Funcionalidades

# 📋 Requisitos do Sistema

## Requisitos Funcionais

O SmartCash foi desenvolvido para atender aos seguintes requisitos funcionais:

### RF01 – Cadastro de Usuários
O sistema deve permitir que novos usuários realizem seu cadastro informando nome, e-mail e senha.

### RF02 – Autenticação
O sistema deve permitir que usuários autenticados realizem login utilizando e-mail e senha.

### RF03 – Cadastro de Transações
O usuário deve poder cadastrar receitas e despesas informando descrição, valor, categoria, tipo e data.

### RF04 – Listagem de Transações
O sistema deve exibir todas as transações pertencentes ao usuário autenticado.

### RF05 – Atualização de Transações
O usuário deve poder editar informações de uma transação previamente cadastrada.

### RF06 – Exclusão de Transações
O usuário deve poder remover transações do sistema.

### RF07 – Dashboard Financeiro
O sistema deve apresentar um resumo contendo receitas, despesas, saldo atual e gráfico financeiro.

### RF08 – Segurança
Cada usuário deve visualizar apenas suas próprias informações financeiras.

---

## Requisitos Não Funcionais

### RNF01 – Segurança
As senhas devem ser armazenadas utilizando criptografia com **bcrypt**.

### RNF02 – Autenticação
As rotas protegidas devem utilizar autenticação baseada em **JWT (JSON Web Token)**.

### RNF03 – Persistência de Dados
As informações devem ser armazenadas em banco de dados **SQLite**.

### RNF04 – Arquitetura
A aplicação deve seguir a arquitetura cliente-servidor, separando Front-end e Back-end.

### RNF05 – API REST
A comunicação entre Front-end e Back-end deve ocorrer por meio de uma API REST utilizando os métodos HTTP:

- GET
- POST
- PUT
- DELETE

### RNF06 – Responsividade
A interface deve ser adaptável para diferentes tamanhos de tela.

### RNF07 – Usabilidade
A interface deve ser intuitiva e permitir o gerenciamento financeiro de forma simples e objetiva.

### RNF08 – Desempenho
As operações de cadastro, consulta, edição e exclusão devem ser executadas de forma rápida e eficiente.

### RNF09 – Compatibilidade
O sistema deve funcionar nos principais navegadores modernos.

### RNF10 – Organização do Código
O projeto deve seguir uma estrutura modular, separando controladores, rotas, banco de dados, middleware e interface do usuário.

### 👤 Autenticação

- Cadastro de usuários
- Login
- Autenticação com JWT
- Rotas protegidas
- Logout

### 💰 Controle Financeiro

- Cadastro de receitas
- Cadastro de despesas
- Categorias
- Data da transação
- Resumo financeiro
- Saldo atualizado automaticamente

### 📊 Dashboard

- Lista de transações
- Gráfico financeiro
- Total de receitas
- Total de despesas
- Saldo atual

### 🔄 CRUD Completo

O sistema realiza operações através de uma API REST.

- ✅ Criar transações
- ✅ Listar transações
- ✅ Atualizar transações
- ✅ Excluir transações

---

# 🛠 Tecnologias Utilizadas

## Front-end

- HTML5
- CSS3
- JavaScript
- Chart.js

## Back-end

- Node.js
- Express
- SQLite
- JWT
- bcrypt
- dotenv
- CORS

---

# 📁 Estrutura do Projeto

```
ConnectHub
│
├── backend
│   ├── controllers
│   ├── database
│   ├── middleware
│   ├── routes
│   ├── data
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── css
│   ├── js
│   ├── assets
│   ├── index.html
│   ├── login.html
│   └── cadastro.html
│
└── README.md
```

---

# 🔒 Segurança

O sistema utiliza autenticação baseada em **JWT (JSON Web Token)**.

Após o login:

- o token é armazenado no navegador;
- todas as requisições protegidas enviam o token no cabeçalho Authorization;
- apenas usuários autenticados podem acessar suas próprias transações.

---

# 🌐 API REST

## Autenticação

### Cadastro

```
POST /auth/cadastro
```

### Login

```
POST /auth/login
```

---

## Transações

### Listar

```
GET /transacoes
```

### Criar

```
POST /transacoes
```

### Atualizar

```
PUT /transacoes/:id
```

### Excluir

```
DELETE /transacoes/:id
```

---

# ▶️ Como executar

## 1. Clone o projeto

```bash
git clone https://github.com/LucasGoes89/ConnectHub.git
```

---

## 2. Instale as dependências

```bash
cd backend

npm install
```

---

## 3. Execute o servidor

```bash
node server.js
```

---

## 4. Abra o Front-end

Utilize a extensão **Live Server** do VS Code ou outro servidor HTTP.

---

# 📷 Demonstração

## Login

- Autenticação de usuários

## Dashboard

- Resumo financeiro
- Lista de transações
- Gráfico financeiro

## CRUD

- Criar
- Atualizar
- Excluir
- Consultar

---

# 🎯 Objetivos atendidos

✔ API REST

✔ CRUD completo

✔ Banco de dados SQLite

✔ Autenticação JWT

✔ Rotas protegidas

✔ Dashboard Financeiro

✔ Front-end responsivo

✔ Integração Front-end + Back-end

✔ Persistência de dados

---

# 👨‍💻 Desenvolvedor

**Lucas de Goes Junior**

GitHub

https://github.com/LucasGoes89

LinkedIn

https://www.linkedin.com/in/lucas-goes-junior/

---

# 📄 Licença

Projeto desenvolvido para fins acadêmicos.