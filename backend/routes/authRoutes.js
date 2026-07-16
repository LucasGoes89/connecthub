const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

// Cadastro
router.post(
    "/cadastro",
    authController.cadastrar
);

// Login
router.post(
    "/login",
    authController.login
);

module.exports = router;