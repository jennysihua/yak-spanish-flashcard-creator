const request = require('request-promise')

const getDefinitions = (reqBody) => Promise.all(reqBody.words.map(async word => {
  try {
    const definition = await request({
      method: 'GET',
      uri: `https://od-api.oxforddictionaries.com:443/api/v1/entries/${reqBody.sourceLang}/${word}/translations=${reqBody.targetLang}`,
      headers: {
        app_key: process.env.OXFORD_CLIENT_ID,
        app_id: process.env.OXFORD_CLIENT_CREDENTIALS
      },
      json: true
    })
    return definition
    } catch (err) {
        return word;
    }
  }))

const getExamples = (reqBody) => Promise.all(reqBody.words.map(async word => {
  try {
  const example = await request({
    method: 'GET',
    uri: `https://od-api.oxforddictionaries.com:443/api/v1/entries/${reqBody.sourceLang}/${word}/sentences`,
    headers: {
      app_key: process.env.OXFORD_CLIENT_ID,
      app_id: process.env.OXFORD_CLIENT_CREDENTIALS
    },
    json: true
  })
  return example
  } catch (err) {
    return null
  }
}))

module.exports = {getDefinitions, getExamples}
