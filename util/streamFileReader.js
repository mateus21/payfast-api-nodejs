var fs = require('fs');
var arquivo = process.argv[2];

fs.createReadStream(arquivo)
    .pipe(fs.createWriteStream('novo-' + arquivo))
    .on('finish', function(){
        console.log('arquivo escrito.');
    });