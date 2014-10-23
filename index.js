var Hapi = require('hapi');
var Good = require('good');
var Path = require('path');
var server = new Hapi.Server('localhost', 3000);


server.route({
  method: 'GET',
  path: '/{path*}',
  handler: {
    directory: {
      path: 'app/',
    }
  }
})

server.route({
  method: 'GET',
  path: '/bower_components/{path*}',
  handler: {
    directory: {
      path: 'bower_components/',
    }
  }
})


server.route({
  method: 'POST',
  path: '/store',
  handler: function(req, reply){
    var obj = JSON.parse(req.payload.obj);
    console.log('body', obj);
    reply(obj);
  }
})


server.pack.register(Good, function (err) {
  if (err) {
    throw err; 
  }
  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
}); 