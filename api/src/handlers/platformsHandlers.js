const { getPlatforms } = require('../controllers/platformsControllers');

// Handler para traer info de las plataformas
const getPlatfomrsHandler = async (req, res) => {
    try {
        const platforms = await getPlatforms();
        res.status(200).json(platforms);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getPlatfomrsHandler };