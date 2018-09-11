module.exports = function(app) {
    app.get("/pagamentos",function(req, res) {
         res.send('ok');
    });

    app.post("/pagamentos/pagamento", function(req, res) {
        var pagamento = req.body;
        console.log('processando pagamento...');

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.salva(pagamento, function(exception, result) {
            console.log('pagamento criado: ' + result);
            res.json(pagamento);
        });
    });
 }