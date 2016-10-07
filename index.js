'use strict';

process.on("SIGINT", function() { console.log("Caught SIGINT"); process.exit(0); });
process.on("SIGTERM", function() { console.log("Caught SIGTERM"); process.exit(0); });

const Hapi = require('hapi');
const Boom = require("boom");

const server = new Hapi.Server();

const mongoHost = process.env.NODE_ENV === 'test' ? 'mongodb' : 'localhost';

const dbOpts = {
    url: `mongodb://${mongoHost}:27017/SoulCompose`,
    settings: {
        db: {
            native_parser: false
        }
    }
};

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

server.route({
    method: 'POST',
    path: '/artist',
    handler: (req, reply) => {
        const db = req.server.plugins['hapi-mongodb'].db;
        db.collection('artists').insert(req.payload, function(err, result) {
            if (err) return reply(Boom.internal('Internal MongoDB error', err));
            reply(`Created a soul singer named ${req.payload.name}`).code(200);
        });
    }
});

server.route({
    method: 'GET',
    path: '/artist/{id}',
    handler: (req, reply) => {
        const db = req.server.plugins['hapi-mongodb'].db;
        db.collection('artists').findOne({ "id" : req.params.id }, function(err, result) {
            if (err) return reply(Boom.internal('Internal MongoDB error', err));
            reply(result.name);
        });
    }
});

server.register({
    register: require('hapi-mongodb'),
    options: dbOpts
}, function (err) {
    
    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});


