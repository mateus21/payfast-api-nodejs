var fs = require('fs');
module.exports = function(app){

  app.post("/upload/imagem", function(req, res){
    console.log('recebendo imagem');

    var filename = req.headers.filename;

    req.pipe(fs.createWriteStream('files/' + filename))
    .on('finish', function(){
      console.log('arquivo escrito');
      res.status(201).send('ok');
    });

  });

}
/* Exemplo de CURL para subir uma imagem
curl -X POST http://localhost:3000/upload/imagem -v -H "filename: teste.png" -H "Content-Type: application/octet-stream" --data-binary @1.png
*/