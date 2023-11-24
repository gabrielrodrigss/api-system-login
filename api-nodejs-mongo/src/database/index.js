const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://gabrielrrodriuges133:g123456@apimongodb.4etmox8.mongodb.net/?retryWrites=true&w=majority", {})
    .then(() => {
        console.log("Conexão com o MongoDB estabelecida com sucesso");
    })
    .catch((error) => {
        console.log("Falha ao autenticar com o MongoDB");
        console.error(error);
    });

console.log('Connected to MongoDB');

mongoose.Promise = global.Promise;

module.exports = mongoose;