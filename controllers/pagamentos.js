module.exports = function(app) {
    app.get("/pagamentos",function(req, res) {
         res.send('ok');
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

            res.send(pagamento);
        });
    });

    app.post("/pagamentos/pagamento", function(req, res) {
        var pagamento = req.body;
        console.log('processando pagamento...');

        req.assert("forma_de_pagamento", "Forma de pagamento é obrigatório").notEmpty();
        req.assert("valor", "Valor é obrigatório e deve ser um decimal").notEmpty().isFloat();

        var erros = req.validationErrors();

        if (erros) {
            console.log('Erros de validacao encontrados');
            res.status(400).send(erros);
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

                res.location('/pagamentos/pagamento/' + result.insertId);
                res.status(201).json(pagamento);
            }
        });
    });
 }