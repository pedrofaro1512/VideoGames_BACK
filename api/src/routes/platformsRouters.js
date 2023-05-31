const { Router } = require('express');
const { getPlatfomrsHandler } = require('../handlers/platformsHandlers');

const platformsRouter = Router();

platformsRouter.get('/', getPlatfomrsHandler);

module.exports = platformsRouter;