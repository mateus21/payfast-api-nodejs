var restify = require('restify');
var clients = require('restify-clients');

function CartoesClient() {
    this._client = clients.createJsonClient({
        url: 'http://localhost:3001',
        version: '~1.0'
    });
}

CartoesClient.prototype.autoriza = function(cartao, callback) {
    this._client.post('/cartoes/autoriza', cartao, callback);
}

module.exports = function(){
    return CartoesClient;
};