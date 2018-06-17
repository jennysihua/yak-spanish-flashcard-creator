
const extractDefinitionData = (dictionaryObject, defId) => {
  const lexicalCategory = dictionaryObject[defId].lexicalCategory
  const dictionaryIndices = dictionaryObject ? dictionaryObject.length : null

  const translation = dictionaryObject[defId].entries[0].senses[0].translations.map(sense => sense.text).join(', ')

  const lexicalInfo = `${lexicalCategory ? lexicalCategory : null}; ${dictionaryObject[defId].entries[0].grammaticalFeatures.map(sense => `${sense.type}: ${sense.text}`).join(`; `)}`

  return ({
    lexicalInfo,
    dictionaryIndices,
    translation
  })
}

const extractExamplesData = (examplesObject, exampleId) => {
  const exampleIndices = examplesObject ? examplesObject.length : null
  const example = examplesObject[exampleId].domains ? `(${examplesObject[exampleId].domains}) ${examplesObject[exampleId].text}` : examplesObject[exampleId].text

  return ({
    exampleIndices,
    example
  })
}

module.exports = {extractDefinitionData, extractExamplesData}
