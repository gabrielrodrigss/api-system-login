const express = require('express');

const AuthController = require("./controllers/AuthController");
const AdminController = require("./controllers/AdminController");

const authenticateMiddleware = require("./middlewares/authenticate")

const app = express();

app.use(express.json());

app.use("/auth", AuthController);
// Se receber um req em /admin, e se o middleware chamar o next, a req passa para o AdminController
app.use("/admin", authenticateMiddleware, AdminController); 

app.listen(3000, () => {
    console.log("Server is running")
})