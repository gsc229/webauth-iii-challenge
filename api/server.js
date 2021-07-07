const express = require('express');
const configureMiddleware = require('./configure-middleware');


const baseApiRouter = require('./api-router');
const server = express();
// see /api/configure-middlware.js
configureMiddleware(server);

server.use('/api', baseApiRouter);

module.exports = server;



