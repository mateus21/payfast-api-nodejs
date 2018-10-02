# Payfast api em Nodejs
Este projeto consiste em uma aplicação desenvolvida em NodeJS. Ela foi desenvolvida com o propósito de criar um ambiente para realizar testes na criação de uma API Rest.

## Tecnologias utilizadas
Para o desenvolvimento desse projeto foram utilizados os seguintes pacotes do NPM:

Express.js
Consign
BodyParser
ExpressValidator

#### Express.js
O Express é um framework para Node.js utilizado para o desenvolvimento de aplicações web e APIs. Com ele é possível definir regras como: rotas, verbos HTTP e Middleware.

#### Consign
Com o Consign é possível fazer o autoload de módulos de forma automática dentro da aplicação. Isso torna o desenvolvimento de uma aplicação muito mais simples, pois o desenvolvedor não precisa se preocupar em carregar os módulos do sistema durante o desenvolvimento.

#### BodyParser
O BodyParser é responsável por processar as requisições feitas ao servidor e disponibilizar para o desenvolvedor um Objeto com todas as informações da requisição além de métodos para que você consiga manipular essas informações de forma elegante.

#### ExpressValidator
Com o ExpressValidator é possível realizar a validação das informações que estão chegando na requisição ao servidor.


## Exemplo de requisição
Segue abaixo um exemplo de uma requisição:

```
curl -X POST -v -H "Content-type: application/json" 
        http://localhost:3000/pagamentos/pagamento 
        -d '{
        "pagamento": {
          "forma_de_pagamento": "cartao",
          "valor": "10.87",
          "moeda": "BRL",
          "descricao": "descrição do pagamento"  
        },

        "cartao": {
          "numero": "1234567890123456",
          "bandeira": "VISA",
          "ano_de_expiracao": "2020",
          "mes_de_expiracao": "12",
          "cvv": "12"
        }
      }' ; echo

```

