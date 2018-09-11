module.exports = function(app) {
    app.get("/pagamentos",function(req, res) {
         res.send('ok');
    });

    app.post("/pagamentos/pagamento", function(req, res) {
        var pagamento = req.body;

        pagamento.status = 'CRIADO';
        pagamento.date = new Date;
        console.log(pagamento);

        res.send(pagamento);
    });
 }