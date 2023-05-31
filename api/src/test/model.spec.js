const { expect } = require('chai');
const { DataTypes } = require('sequelize');
const { sequelize } = require('sequelize');
require('sequelize');

const GenreModel = require('../models/Genre');

describe('Genre Model', () => {
  // Define una instancia del modelo Genre
  const Genre = GenreModel(sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  }));

  // Verifica si el modelo Genre se define correctamente
  it('should define the Genre model', () => {
    expect(Genre).to.be.an('object');
    expect(Genre.name).to.equal('Genre');
  });

  // Verifica si los atributos del modelo se definen correctamente
  it('should define the name attribute', () => {
    expect(Genre.attributes.name).to.be.an('object');
    expect(Genre.attributes.name.type).to.deep.equal(DataTypes.STRING);
    expect(Genre.attributes.name.allowNull).to.be.false;
  });
});