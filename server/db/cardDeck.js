const db = require('./database')
const Sequelize = require('sequelize')

const CardDeck = db.define('cardDeck', {
})

module.exports = CardDeck
