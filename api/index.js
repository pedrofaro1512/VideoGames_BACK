const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getGenres } = require('./src/controllers/genresControllers.js');
const PORT = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
    await getGenres();
  });
});
``