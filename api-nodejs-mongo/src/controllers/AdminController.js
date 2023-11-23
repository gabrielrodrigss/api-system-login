const express = require("express");
const router = express.Router();
// const UserModel = require("../models/User");
const authenticate = require("../middlewares/authenticate");

// Endpoint de Buscar Usuário
router.get("/users", authenticate, async (req, res) => {
    try {
        // O middleware de autenticação (`authenticate`) adiciona o usuário decodificado ao objeto de solicitação (`req`)
        const user = req.userLogged;

        // Oculta dados sensíveis antes de enviar a resposta
        user.nome = undefined;
        user.senha = undefined;

        return res.json({
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: "Error interno do servidor.",
        });
    }
});

module.exports = router;