const router = require('express').Router()
const {Card, cardDeck} = require('../db')
const {getDefinitions, getExamples} = require('./external')
const {extractDefinitionData, extractExamplesData} = require('./helperFunctions')

router.post('/', async (req, res, next) => {
  try {
    const definitions = await getDefinitions(req.body)
    const examples = await getExamples(req.body)
    const initialIndex = 0

    const entries = await Promise.all(
      definitions.map((definition, index) => {
        if (!definition.results) {return Card.create({
          term: definition,
          dictionaryObject: [],
          examplesObject: [],
          dictionaryIndex: null,
          dictionaryIndices: [],
          examplesIndex: null,
          examplesIndices: [],
          translation: 'Not found',
          example: 'Not found',
          lexicalInfo: 'Not found',
          userId: req.user.id,
          level: 1,
        })}

        const dictionaryObject = definition.results[0] ? definition.results[0].lexicalEntries : null

        const term = dictionaryObject ? dictionaryObject[0].text : definition.results[0].id

        const {
          lexicalInfo,
          dictionaryIndices,
          translation
        } = extractDefinitionData(dictionaryObject, initialIndex)

        const examplesPresent = examples[index] ? examples[index].results : null

        const examplesObject = examplesPresent ? examplesPresent[0].lexicalEntries[0].sentences : null

        const {
          exampleIndices,
          example
        } = extractExamplesData(examplesObject, initialIndex)

        return Card.create({
          term,
          dictionaryObject,
          examplesObject,
          dictionaryIndex: initialIndex,
          dictionaryIndices: [...Array(dictionaryIndices).keys()],
          examplesIndex: initialIndex,
          examplesIndices: [...Array(exampleIndices).keys()],
          translation,
          example,
          lexicalInfo,
          userId: req.user.id,
          level: 1,
        })
      })
    )
    res.send(entries)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
  const cards = await Card.findAll({
    where: {
      userId: req.user.id
    }
  })
  res.send(cards)
  } catch (err) {
    next(err)
  }
})

// router.get('/:id', async (req, res, next) => {

// })

router.put('/:id/definition', async (req, res, next) => {
  try {
    const {dictionaryObject, id} = req.body

    const {
      lexicalInfo,
      translation
    } = extractDefinitionData(dictionaryObject, id)

    const card = await Card.findById(req.params.id)
    const updatedCard = await card.update({
      dictionaryIndex: id,
      lexicalInfo: lexicalInfo,
      translation: translation,
    })
    res.send(updatedCard)
  } catch (err) {
    next(err)
  }
})

router.put('/:id/example', async (req, res, next) => {
  try {
    const { examplesObject, id} = req.body
    const {
      example
    } = extractExamplesData(examplesObject, id)
    const card = await Card.findById(req.params.id)
    const updatedCard = await card.update({
      examplesIndex: id,
      example,
    })
    res.send(updatedCard)
  } catch (err) {
    next(err)
  }
})

router.put('/:id/level', async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id)
    const updatedCard = await card.update({
      level: req.body.level
    })
    res.send(updatedCard)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id)
    await card.destroy()
  } catch (err) {
    next(err)
  }
})

module.exports = router
