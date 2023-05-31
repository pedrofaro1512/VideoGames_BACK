const { Router } = require('express');
// Importar todos los routers;
const videogamesRouter = require('./videogamesRouters');
const genresRouter = require('./genresRouters');
const platformsRouter = require('./platformsRouters')

const router = Router();

// Path de las rutas
router.use('/videogames', videogamesRouter);
router.use('/genres', genresRouter);
router.use('/platforms', platformsRouter);

module.exports = router;
