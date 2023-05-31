const {
    getAllVideogames,
    searchVideogameByName,
    createVideogame,
    getVideogameById,
    deleteVideogame,
    //updateVideogame
} = require('../controllers/videogamesControllers');

// Handler para traer todos los videogames si no se le pasa nada o trae el videogame que se le paso name por query
const getVideogameHandler = async (req, res) => {
    const { name } = req.query;
    try {
        const response = name
            ? await searchVideogameByName(name)
            : await getAllVideogames()
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Handler para crear un juego (body)
const postVideogameHandler = async (req, res) => {
    const { name, image, description, platforms, released, rating, genres } = req.body;
    try {
        const newVideogame = await createVideogame(name, image, description, platforms, released, rating, genres);
        res.status(201).json(newVideogame);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Handler para traer videogame por id. (params)
const getVideogameIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getVideogameById(id)
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Handler para borrar un video juego
const deleteVideogameHandler = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteVideogame(id);
        res.status(200).send("Video game successfully removed");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Handler para modificar un video juego
// const putVideogamesHandler = async (req, res) => {
//     const { id } = req.params;
//     const { name, image, description, platforms, released, rating, genres } = req.body;
//     try {
//         const updatedVideogame = updateVideogame(id, { name, image, description, platforms, released, rating, genres });
//         res.status(200).send("Juego actualizado");
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

module.exports = {
    getVideogameHandler,
    getVideogameIdHandler,
    postVideogameHandler,
    deleteVideogameHandler,
    //putVideogamesHandler
};