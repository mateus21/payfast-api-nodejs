module.exports = function(app) {
    app.get("/pagamentos",function(req, res) {
         res.send('ok');
    });

    app.delete('/pagamentos/pagamento/:id', function(req, res) {
        var pagamento = {};
        var id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'CANCELADO';

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.atualiza(pagamento, function(erro) {
            if(erro) {
                res.status(500).send(erro);
                return;
            }

            res.status(204).send(pagamento);
        });
    });

    app.put('/pagamentos/pagamento/:id', function(req, res) {
        var pagamento = {};
        var id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'CONFIRMADO';

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.atualiza(pagamento, function(erro) {
            if(erro) {
                res.status(500).send(erro);
                return;
            }

            res.status(204).send(pagamento);
        });
    });

    app.post("/pagamentos/pagamento", function(req, res) {
        var pagamento = req.body["pagamento"];
        console.log('processando pagamento...');

        req.assert("pagamento.forma_de_pagamento", "Forma de pagamento é obrigatório").notEmpty();
        req.assert("pagamento.valor", "Valor é obrigatório e deve ser um decimal").notEmpty().isFloat();

        var erros = req.validationErrors();

        if (erros) {
            console.log('Erros de validacao encontrados');
            res.status(400).send(erros);
            return;
        }

        pagamento.status = 'CRIADO';
        pagamento.data = new Date;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.salva(pagamento, function(exception, result) {
            if (exception) {
                res.status(500).send(exception);
            } else {
                console.log('pagamento criado');

                pagamento.id = result.insertId

                if (pagamento.forma_de_pagamento == 'cartao'){
                    var cartao = req.body["cartao"];
                    console.log(cartao);

                    var clienteCartoes = new app.servicos.CartoesClient();

                    clienteCartoes.autoriza(cartao, function(exception, request, response, retorno){
                        if(exception){
                            console.log(exception);
                            res.status(400).send(exception);
                            return;
                        }
                        console.log(retorno);

                        res.location('/pagamentos/pagamento/' + pagamento.id);

                        var response = {
                            dados_do_pagamanto: pagamento,
                            cartao: retorno,
                            links: [
                                {
                                href:"http://localhost:3000/pagamentos/pagamento/"
                                        + pagamento.id,
                                rel:"confirmar",
                                method:"PUT"
                                },
                                {
                                href:"http://localhost:3000/pagamentos/pagamento/"
                                        + pagamento.id,
                                rel:"cancelar",
                                method:"DELETE"
                                }
                            ]
                        }
                        res.status(201).json(response);
                        return;
                    });
            
                } else {

                    res.location('/pagamentos/pagamento/' + pagamento.id);

                    var response = {
                        dados_do_pagamento: pagamento,
                        links: [
                            {
                                href:"http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                                rel:"confirmar",
                                method:"PUT"
                            },
                            {
                                href:"http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                                rel:"cancelar",
                                method:"DELETE"
                            }
                        ]
                    }
                    res.status(201).json(response);
                }
            }
        });
    });
 }