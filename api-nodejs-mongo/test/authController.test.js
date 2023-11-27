const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/server"); 
const expect = chai.expect;

chai.use(chaiHttp);

describe("AuthController", () => {
    describe("POST /auth/authenticate", () => {
        it("Deve autenticar um usuário com sucesso", (done) => {
            chai.request(app)
                .post("/auth/authenticate")
                .send({
                    email: "desenvolvedor.gabriel@gmail.com",
                    senha: "123456",
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("user");
                    expect(res.body).to.have.property("token");
                    done();
                });
        });

        it("Deve retornar erro para usuário/senha inválidos", (done) => {
            chai.request(app)
                .post("/auth/authenticate")
                .send({
                    email: "usuario_inexistente@example.com",
                    senha: "senha_incorreta",
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property("error", true);
                    expect(res.body).to.have.property("message", "Usuário e/ou senha inválidos");
                    done();
                });
        });
    });
});