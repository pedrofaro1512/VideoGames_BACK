const { Genre } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

// Controller para traer todos los genres y guardarlos en la BD
const getGenres = async () => {
    let apiGenres = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results;

    apiGenres = apiGenres?.map((genre) => {
        return {
            name: genre.name,
        }
    });
    apiGenres.forEach(async (genre) => {
        await Genre.findOrCreate({
            where: {
                name: genre.name,
            },
        });
    });
    let genres = await Genre.findAll();
    return genres;
};

module.exports = { getGenres };