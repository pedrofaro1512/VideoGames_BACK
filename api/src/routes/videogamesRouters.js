const { Router } = require('express');
const { 
    getVideogameHandler,
    getVideogameIdHandler,
    postVideogameHandler,
    deleteVideogameHandler,
    //putVideogamesHandler,
} = require('../handlers/videogamesHandlers')

const videogamesRouter = Router();

// Validación de creación de juegos
const validateVideogame = (req, res, next) => {
    const { name, image, description, platforms, released, rating, genres } = req.body;
    if (!name) return res.status(400).json({ error: "Missing name" });
    if (!image) return res.status(400).json({ error: "Missing image" }); 
    if (!description) return res.status(400).json({ error: "Missing description" }); 
    if (!platforms) return res.status(400).json({ error: "Missing platforms" }); 
    if (!released) return res.status(400).json({ error: "Missing released" }); 
    if (!rating) return res.status(400).json({ error: "Missing rating" }); 
    if (!genres) return res.status(400).json({ error: "Missing genres" }); 

    next();
};

videogamesRouter.get('/', getVideogameHandler);
videogamesRouter.post('/', validateVideogame, postVideogameHandler);
videogamesRouter.get('/:id', getVideogameIdHandler);
videogamesRouter.delete('/:id', deleteVideogameHandler);
// videogamesRouter.put('/:id', putVideogamesHandler);

module.exports = videogamesRouter;