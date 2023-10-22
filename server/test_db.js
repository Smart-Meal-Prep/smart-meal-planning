const { Sequelize } = require('sequelize');
const ini = require('./config/config.js');
const config = JSON.parse(JSON.stringify(ini));
/*This file is used to test if the connection to the data base is vaild*/
// Set the environment (e.g., 'development')
const environment = process.env.NODE_ENV || 'development';
// Initialize Sequelize with the configuration
const sequelize = new Sequelize(config[environment].database, config[environment].username, config[environment].password, {
  host: config[environment].host,
  dialect: 'postgres', 
  port: config[environment].port,
  logging: false
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

