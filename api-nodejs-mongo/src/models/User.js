const mongoose = require("../database/index");

const bcryptjs = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    telefones: [{ 
        numero: String, 
        ddd: String 
    }],
    data_criacao: { 
        type: Date, 
        default: Date.now 
    },
    data_atualizacao: { 
        type: Date, 
        default: Date.now 
    },
    ultimo_login: { 
        type: Date,
        default: Date.now 
    },
});

// Criptografa a senha antes de salvar, e depois salva no db
UserSchema.pre("save", async function(next) {
    const hash = await bcryptjs.hash(this.senha, 10);
    this.senha = hash;
});

const User = mongoose.model("User", UserSchema);

module.exports = User;