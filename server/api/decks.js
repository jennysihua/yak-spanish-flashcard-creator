const router = require('express').Router()
const {Deck, cardDeck, Card} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const decks = await Deck.findAll({
      where: {
        userId: req.user.id
      }, include: [{all: true}]})
    res.send(decks)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const deck = await Deck.create(req.body)
    res.send(deck)
  } catch (err) {
    next(err)
  }
})

router.post('/:deckId/:cardId', async (req, res, next) => {
  try {
    const deck = await Deck.findOne({
      where: {id: req.params.deckId}
    })
    const card = await Card.findById(req.params.cardId)
    await card.addDeck(deck)
    const updatedDeck = await Deck.findOne({
      where: {id: req.params.deckId}, include: [{all: true}]
    })
    res.send(updatedDeck)
  } catch (err) {
    next(err)
  }
})

router.delete('/:deckId/:cardId', async (req, res, next) => {
  try {
    const deck = await Deck.findOne({
      where: {id: req.params.deckId}
    })
    const card = await Card.findById(req.params.cardId)
    await card.removeDeck(deck)
    const updatedDeck = await Deck.findOne({
      where: {id: req.params.deckId}, include: [{all: true}]
    })
    console.log(updatedDeck)
    res.send(updatedDeck)
  } catch (err) {
    next(err)
  }
})

module.exports = router
