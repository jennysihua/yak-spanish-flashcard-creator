import React from 'react'
import {connect} from 'react-redux'
import {editDeck, addCardToDeck, removeCardFromDeck} from '../reducers'

const SingleDeck = props => {

  const deck = props.decks ? props.decks.find(dck => {
    return (dck.id === Number(props.match.params.id))
  }) : null

  const deckCards = deck ? deck.cards.map(card => card.id) : []

  console.log('DECK', deck)

  if (deck) {
    return (
      <div className="single-deck-container">
        <div className="single-card">
          <div className="row">
            <div className="card horizontal">
              <div className="col m3 card-section">
                <div>
                  Cards in Deck
                </div>
              </div>
              <div className="col m9 card-section">
                <div className="term">
                  {deck.cards.map(card => {
                  return (
                    <div key={card.id} onClick={() => {props.removeCardFromDeck(deck.id, card.id)}}>{card.term}</div>
                  )})}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="card horizontal">
              <div className="col m3 card-section">
                <div>
                  Add Cards to Deck
                </div>
              </div>
              <div className="col m9 card-section">
                <div className="term">
                  {props.cards.map(card => {
                    if (deckCards.indexOf(card.id) === -1) {
                      return (<div key={card.id} onClick={() => {props.addCardToDeck(deck.id, card.id)}}>{card.term}</div>)
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div />
    )
  }
}

const mapStateToProps = state => ({
  decks: state.decks,
  cards: state.cards
})

const mapDispatchToProps = dispatch => ({
  editDeck: deck => dispatch(editDeck(deck)),
  addCardToDeck: (deckId, cardId) => dispatch(addCardToDeck(deckId, cardId)),
  removeCardFromDeck: (deckId, cardId) => dispatch(removeCardFromDeck(deckId, cardId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleDeck)
