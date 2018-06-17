const db = require('./database')
const Sequelize = require('sequelize')

const Deck = db.define('deck', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Deck
