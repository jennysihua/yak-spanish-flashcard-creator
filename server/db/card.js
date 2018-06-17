const db = require('./database')
const Sequelize = require('sequelize')

const Card = db.define('card', {
  term: {
    type: Sequelize.STRING,
  },
  dictionaryObject: {
    type: Sequelize.JSON,
  },
  examplesObject: {
    type: Sequelize.JSON,
  },
  dictionaryIndex: {
    type: Sequelize.INTEGER,
  },
  dictionaryIndices: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  examplesIndex: {
    type: Sequelize.INTEGER,
  },
  examplesIndices: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  translation: {
    type: Sequelize.STRING,
  },
  example: {
    type: Sequelize.TEXT,
  },
  lexicalInfo: {
    type: Sequelize.TEXT,
  }
})

module.exports = Card
