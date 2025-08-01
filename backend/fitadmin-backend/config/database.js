const { Sequelize } = require('sequelize');

// Crear instancia de Sequelize usando SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // archivo que se creará en la raíz del proyecto
  logging: false, // podés poner true si querés ver las queries en consola
});

module.exports = sequelize;
