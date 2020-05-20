const db = require('./database');
const Sequelize = require('sequelize');

const Project = db.define('project', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    // make sure to use valdation for anything then allwoNull
    validate: {
      notEmpty: false,
    },
  },
  deadline: {
    type: Sequelize.DATE,
  },
  priority: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 10
    }
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  description: {
    type: Sequelize.TEXT,
  }
});

module.exports = Project;
