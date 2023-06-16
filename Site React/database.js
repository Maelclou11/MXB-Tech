require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

module.exports = sequelize;

// Sert à créer la base de donnée ou bien la synchroniser
sequelize.sync({ alter: true }) // Utilisez { force: true } pour recréer les tables (attention, cela supprime les données existantes)
	  .then(() => {
	    console.log('Database tables have been synchronized.');
	  })
	  .catch((error) => {
	    console.error('Error synchronizing the database tables:', error);
	  });