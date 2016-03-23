require('../shared/ts-register');

var app = require('./app').app;
var port = app.get('port');
var server = app.listen(port);

server.on('listening', function() {
    console.log('application started on ' + app.get('host') + ':' + port)
});
