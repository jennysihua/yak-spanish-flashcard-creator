import axios from 'axios'

const initialState = []

const GET_ALL_CARDS = 'GET_CARDS'
const ADD_NEW_CARDS = 'ADD_NEW_CARDS'
const EDIT_CARD = 'EDIT_CARD'

const gotAllCards = cards => ({
  type: GET_ALL_CARDS,
  cards
})

const addedNewCards = cards => ({
  type: ADD_NEW_CARDS,
  cards
})

const editedCard = card => ({
  type: EDIT_CARD,
  card
})

export const getAllCards = () => async dispatch => {
  const { data } = await axios.get(`/api/cards`)
  dispatch(gotAllCards(data))
}

export const addNewCards = words => async dispatch => {
  const cardsObject = {words,  sourceLang: 'es', targetLang: 'en'}
  const { data } = await axios.post(`/api/cards`, cardsObject)
  console.log('ADDED', data)
  dispatch(addedNewCards(data))
}

export const editCard = card => async dispatch => {
  const { data } = await axios.put(`/api/cards/${card.id}`, card)
  dispatch(editedCard(data))
}

export const editDefinition = (card, id) => async dispatch => {
  const { data } = await axios.put(`/api/cards/${card.id}/definition`, {
    dictionaryObject: card.dictionaryObject,
    id
  })
  dispatch(editedCard(data))
}

export const editExample = (card, id) => async dispatch => {
  const { data } = await axios.put(`/api/cards/${card.id}/example`, {
    examplesObject: card.examplesObject,
    id
  })
  dispatch(editedCard(data))
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CARDS: {
      return action.cards
    }
    case ADD_NEW_CARDS: {
      return [...state, ...action.cards]
    }
    case EDIT_CARD: {
      return state.map(card => {
        if (card.id === action.card.id) return action.card
        return card
      })
    }
    default: {
      return state
    }
  }
}
