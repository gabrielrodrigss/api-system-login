// Verifica o token antes de chegar na rota do admin. 
// O objetivo do next é depois da validações e o 
// usuário poder ir para a próxima rota, chama o next
// O next é que vai dizer se vai poder chegar no user do AdminController.

const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json") 

module.exports = (req, res, next) => {
    console.log("middleware");
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({
            error: true,
            message: "Token no provided"
        })
    }

    const parts = authHeader.split(" ") ;

    if(parts.length !== 2) {
        return res.status(401).json({
            error: true,
            message: "Invalid token type"
        })
    }

    const [scheme, token] = parts;

    if(scheme.indexOf("Bearer") !== 0) {
        return res.status(401).json({
            error: true,
            message: "Token malformtted"
        })
    }

    // Verificação do token. Expirado ou inválido
    return jwt.verify(token, authConfig.secret, (err, decoded) => {

        if(err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    message: "Sessão inválida",
                });
            }

            return res.status(401).json({
                message:"Não autorizado"
            })
        }

        req.userLogged = decoded;

        return next();
    });
}