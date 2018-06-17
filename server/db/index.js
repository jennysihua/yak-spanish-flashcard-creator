'use strict'

const db = require('./database')

// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models (which you should define in separate modules in this directory).
// Example:
//
const Card = require('./card')
const Deck = require('./deck')
const User = require('./user')
const CardDeck = require('./cardDeck')

Card.belongsToMany(Deck, {
  through: 'cardDeck'
})

Deck.belongsToMany(Card, {
  through: 'cardDeck'
})

Card.belongsTo(User)
Deck.belongsTo(User)
User.hasMany(Card)
User.hasMany(Deck)

module.exports = {
  // Include your models in this exports object as well!
  db, Card, Deck, CardDeck, User
}
