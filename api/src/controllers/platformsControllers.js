const axios = require('axios');
const { API_KEY } = process.env;

// Controller para traer todas las plataformas
const getPlatforms = async () => {
    let apiPlatforms = (await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)).data.results;

    apiPlatforms = apiPlatforms?.map((platform) => {
        return {
            name: platform.name,
        }
    });
    return apiPlatforms;
};

module.exports = { getPlatforms };