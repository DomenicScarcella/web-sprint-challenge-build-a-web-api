const express = require('express');
const server = express();
// const actionsRouter = require('./actions/actions-router.js');
// const projectsRouter = require('./projects/projects-router.js');
// const { logger } = require('./middleware/mw.js');

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json());
// server.use('/api/actions', logger, actionsRouter);
// server.use('/api/projects', logger, projectsRouter);

// server.get('/', logger, (req, res) => {
//     res.send('middleware!');
// });

module.exports = server;
