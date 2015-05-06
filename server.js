var soap = require('soap-server');

var ClientService = function () {
    this.clients = [];
};

ClientService.prototype.addClient = function (name) {
    this.clients.push(name);
    return 'added client named ' + name;
};

ClientService.prototype.getClients = function (args) {
    return this.clients.length;
};

var server = new soap.SoapServer();
var service = server.addService('ClientService', new ClientService());

var addClientMethod = service.getOperation('addClient');
addClientMethod.setInputType('name', { type: 'string' });
addClientMethod.setOutputType('string');

var getClientsMethod = service.getOperation('getClients');
getClientsMethod.setOutputType('number');

server.listen(1337, '127.0.0.1');
