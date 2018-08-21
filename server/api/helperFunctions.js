
const extractDefinitionData = (dictionaryObject, defId) => {
  try {
    const lexicalCategory = dictionaryObject[defId].lexicalCategory ? dictionaryObject[defId].lexicalCategory : null
    const dictionaryIndices = dictionaryObject ? dictionaryObject.length : null

    const translation = dictionaryObject[defId].entries[0].senses[0].translations ? dictionaryObject[defId].entries[0].senses[0].translations.map(sense => sense.text).join(', ') : (dictionaryObject[defId].entries[0].senses[0].subsenses ? dictionaryObject[defId].entries[0].senses[0].subsenses[0].translations.map(sense => sense.text).join(', ') : 'Not found')

    const lexicalInfo = `${lexicalCategory ? lexicalCategory : null}; ${dictionaryObject[defId].entries[0].grammaticalFeatures.map(sense => `${sense.type}: ${sense.text}`).join(`; `)}`

    return ({
      lexicalInfo,
      dictionaryIndices,
      translation
    })
  } catch (err) {
      return ({
        lexicalInfo: 'Not found',
        dictionaryIndices: [],
        translation: 'Not found'
      })
  }
}

const extractExamplesData = (examplesObject, exampleId) => {
  try {
    const exampleIndices = examplesObject ? examplesObject.length : null

    const exampleIdPresent = examplesObject ? examplesObject[exampleId] : null

    const exampleDomains = examplesObject[exampleId].domains ? `(${examplesObject[exampleId].domains}) ` : ``

    const example = exampleIdPresent ? `${exampleDomains}${examplesObject[exampleId].text}` : 'Not found'

    return ({
      exampleIndices,
      example
    })
  } catch (err) {
    return ({
      exampleIndices: [],
      example: 'Not found'
    })
  }
}

module.exports = {extractDefinitionData, extractExamplesData}
