var soap = require('soap-server');
var util = require('util');

var ClientService = function () {
    this.clients = [];
};

ClientService.prototype.addClient = function (name) {
    console.log(util.format('adding client, name: [%s].', name));

    this.clients.push(name);
};

ClientService.prototype.getClients = function (name) {
    console.log(util.format('getting clients list, filter: [%s].', name));

    var filter = function (client) {
        return client.indexOf(name) > -1;
    };
    return name === 'undefined' ? this.clients : this.clients.filter(filter);
};

var server = new soap.SoapServer();
var service = server.addService('ClientService', new ClientService());

var addClientMethod = service.getOperation('addClient');
addClientMethod.setInputType('name', { type: 'string' });

var getClientsMethod = service.getOperation('getClients');
getClientsMethod.setInputType('name', { type: 'string' });
getClientsMethod.setOutputType('string[]');

server.listen(1337, '127.0.0.1');
