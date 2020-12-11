const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodejs-teste', 'root', '', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;
