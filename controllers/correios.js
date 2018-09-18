module.exports = function(app){

    app.post('/correios/calculo-prazo', function(req, res){
      var dadosDaEntrega = req.body;

      console.log(dadosDaEntrega);
  
      var correiosSOAPClient = new app.servicos.CorreiosSOAPClient();
      correiosSOAPClient.calculaPrazo(dadosDaEntrega, function(erro, resultado){
                  if (erro){
                    res.status(500).send(erro);
                    return;
                  }
                  console.log('prazo calculado');
                  res.json(resultado);
                });
  
    });
  }