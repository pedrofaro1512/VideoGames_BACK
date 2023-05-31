const { Videogame, Genre } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');
const { API_KEY } = process.env;

// Filtrado de la información de los videogames
const cleanVideogame = (arr) => { 
    const clean = arr.map((elem) => {
        return {
            id: elem.id,
            name: elem.name,
            description: elem.description,
            platforms: elem.platforms.map((el) => el.platform.name,),
            image: elem.background_image,
            released: elem.released,
            rating: elem.rating,
            created: false,
            genres: elem.genres.map((el) => el.name,),
        };
    });
    return clean;
};

// Controller para videogames de la BD o la API por name o no
const searchVideogameByName = async (name) => {
    const dbVideogames = await Videogame.findAll({
        where: { 
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });

    const apiVideogames = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data.results;
    
    const apiVideogamesData = cleanVideogame(apiVideogames);

    const filteredApiVideogame = apiVideogamesData.filter((elem) => elem.name.toLowerCase().includes(name.toLowerCase()));

    return [ ...dbVideogames, ...filteredApiVideogame];
};

// Controller para traer todos los videogames de la BD o la API
const getAllVideogames = async () => {
    const dbVideogames = await Videogame.findAll();

    let apiurls = [];
        for(let i = 1; i <= 7; i++) {
            apiurls = [...apiurls, `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`]
        };
        let apiVideogames = apiurls.map((url)=> axios.get(url));
        apiVideogames = await Promise.all(apiVideogames);
        apiVideogames = apiVideogames?.map((response) => response.data.results).flat();

    const apiVideogamesData = cleanVideogame(apiVideogames);

    return [ ...dbVideogames, ...apiVideogamesData];
};

// Controller para crear un nuevo juego
const createVideogame = async (name, image, description, platforms, released, rating, genres) => {
    const newVideogame = await Videogame.create({ name, image, description, platforms, released, rating, genres });
    let genreDB = await Genre.findAll({
        where: {name: genres}
    })
    newVideogame.addGenre(genreDB)
    return newVideogame;
};

// Filtrado de la información del videogame por ID
const cleanVideogameID = (videogame) => {
    return {
      id: videogame.id,
      name: videogame.name,
      description: videogame.description,
      platforms: videogame.platforms.map((el) => el.platform.name,),
      image: videogame.background_image,
      released: videogame.released,
      rating: videogame.rating,
      created: false,
      genres: videogame.genres.map((el) => el.name,),
    };
};

// Controller para taer un video juego por id
const getVideogameById = async (id) => {
    if (isNaN(id)) {
        const videogame = await Videogame.findByPk(id,{
            include: {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });
        return videogame;
    }
    const videogame = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data;
    return cleanVideogameID(videogame);
};

// Controller para eliminar un video juego
const deleteVideogame = async (id) => {
    await Videogame.destroy({ where: { id }});
};

// const updateVideogame = async (id, info) => {
//     const games = getAllVideogames();

//     const videogame = games.find((game) => game.id === id);
//     const { name, image, description, platforms, released, rating, genres } = info;
//     if (![name, image, description, platforms, released, rating, genres].every(Boolean))
//         throw Error("Faltan datos");
    
//     videogame.name = name;
//     videogame.image = image;
//     videogame.description = description;
//     videogame.platforms = platforms;
//     videogame.released = released;
//     videogame.rating = rating;
//     videogame.genres = genres;

//     return videogame;
// };

module.exports = {
    getAllVideogames,
    searchVideogameByName,
    createVideogame,
    getVideogameById,
    deleteVideogame,
    // updateVideogame
};