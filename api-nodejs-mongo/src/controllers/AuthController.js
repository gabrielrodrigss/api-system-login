// Responsável por pegar a requisição, e depois chamar a model 
// e fazer a operação que precisa fazer com a model e retorna 
// através da api
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const UserModel = require("../models/User"); // importar a model pra operações

const router = express.Router(); // para criar rotas

const generateToken = (user = {}) => {
    return jwt.sign({
        id: user.id,
        nome: user.nome
    },authConfig.secret , {
        expiresIn: 86400
    });
}

// Registro de usuário
router.post("/register", async(req, res) => {

    const {email} = req.body;

    if(await UserModel.findOne({email})) {
        return res.status(400).json({
            message: "E-mail já existente"
        })
    }
    
    const user = await UserModel.create(req.body);

    user.nome = undefined;
    user.email = undefined;
    user.senha = undefined;
    user.telefones = undefined;
    user.__v = undefined;

    return res.json({
        user,
        token: generateToken(user)
    });
    
});

// Autenticação de usuário
router.post("/authenticate", async(req, res) => {
    const {email, senha} = req.body;

    const user = await UserModel.findOne({email}).select("+senha");

    // Confere se o usuário existe pelo e-mail.
    if(!user) {
        return res.status(400).json({
            message: 'Usuário e/ou senha inválidos'
        })
    }

    if(!await bcrypt.compare(senha, user.senha)) {
        return res.status(400).send({
            message: "Usuário e/ou senha inválidos"
        })
    }

    user.nome = undefined;
    user.email = undefined;
    user.senha = undefined;
    user.telefones = undefined;
    user.__v = undefined;

    return res.json({
        user,
        token: generateToken(user)
    });
});

module.exports = router;