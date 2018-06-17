//reducer for creating associations between decks?

import cards from './card'
import decks from './deck'
import user from './user'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({cards, decks, user})

export * from './card'
export * from './deck'
export * from './user'

export default rootReducer
