# Exemplos CURL para testar no postman

Segue o exemplo de testes que podem ser feitos através do postman com CURL, estou enviando para economizar tempo de quem estiver analisando.

- Cadastro

"curl --location 'https://api-nodejs-mongo-09e3850cc71e.herokuapp.com/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nome": "Gabriel",
    "email": "desenvolvedor.gabriel25@gmail.com",
    "senha": "123456",
    "telefones": {
        "numero": "987654321",
        "ddd": "38"
    }
}'"

Tentativa de cadastro

"curl --location 'https://api-nodejs-mongo-09e3850cc71e.herokuapp.com/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nome": "Gabriel",
    "email": "desenvolvedor.gabriel20@gmail.com",
    "senha": "123456",
    "telefones": {
        "numero": "987654321",
        "ddd": "38"
    }
}'"

- Autenticar usuário:

"curl --location 'https://api-nodejs-mongo-09e3850cc71e.herokuapp.com/auth/authenticate' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "desenvolvedor.gabriel20@gmail.com",
    "senha": "123456"
}'"

Autenticação com e-mail ou senha inválida:

"curl --location 'https://api-nodejs-mongo-09e3850cc71e.herokuapp.com/auth/authenticate' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "desenvolvedor.gabriel30@gmail.com",
    "senha": "123456"
}'"


- Buscar usuário:

token válido por 1 dia:

"curl --location --request GET 'https://api-nodejs-mongo-09e3850cc71e.herokuapp.com/admin/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjBmNjNiYWJlZWRiMTFmYWM0MDBlNSIsImlhdCI6MTcwMDg1NjIxNCwiZXhwIjoxNzAwODU4MDE0fQ.txv6Cv7YG79hqaAqGgNrJVWwpC0glU3T5AGrB9Iol2w' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "desenvolvedor.gabriel20@gmail.com",
    "senha": "123456"
}'"


token expirado:

"curl --location 'https://api-nodejs-mongo-09e3850cc71e.herokuapp.com/admin/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWY5NzMzMzg5NDViYzQ5NWFhYjM5MyIsImlhdCI6MTcwMDgzMzA0NCwiZXhwIjoxNzAwODM0ODQ0fQ.b3NUQxypal1fT7SoY6m_DPYfB6ThFOJIcX2tXTQOhQM' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "desenvolvedor.gabriel30@gmail.com",
    "senha": "123456"
}'"

token inválido:

"curl --location --request GET 'https://api-nodejs-mongo-09e3850cc71e.herokuapp.com/admin/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjBmNjNiYWJlZWRiMTFmYWM0MDBlNSIsImlhdCI6MTcwMDg1NjIxNCwiZXhwIjoxNzAwODU4MDE0fQ.txv6Cv7YG79hqaAqGgNrJVWwpC0glU3T5AGrB9Iol2i' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "desenvolvedor.gabriel20@gmail.com",
    "senha": "123456"
}'"
