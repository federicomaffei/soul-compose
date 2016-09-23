'use strict';

process.on("SIGINT", function() { console.log("Caught SIGINT"); process.exit(0); });
process.on("SIGTERM", function() { console.log("Caught SIGTERM"); process.exit(0); });

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
    port: 3000
});

server.route({
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
        reply('Funky soul singers')
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
