const db = require('./database')
const Sequelize = require('sequelize')

const Robot = db.define('robots', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  fuelType: {
    type: Sequelize.ENUM('gas', 'diesel', 'electric'),
    defaultValue: 'electric'
  },
  fuelLevel: {
    validate: {
      min: 0,
      max: 100
    },
    defaultValue: 100,
    type: Sequelize.FLOAT
  }
})

module.exports = Robot
