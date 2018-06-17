import React from 'react'
import {connect} from 'react-redux'
import {FlashcardRect} from './'
import {editLevel} from '../reducers'

class Flashcard extends React.Component {
  constructor () {
    super()
    this.state = {
      currentCard: {term: 'Click here to study'},
      currentCards: [],
      viewAnswer: false,
    }
  }

  nextCard = () => {
    if (this.state.currentCards.length) {
      this.setState((state) => ({
        currentCard: state.currentCards[Math.floor(Math.random() * state.currentCards.length)]
      }))
    } else {
      this.setState({currentCard: {term: 'No cards to study'}})
    }
  }

  rateCard = level => {
    this.props.editLevel(this.state.currentCard.id, level)
    this.nextCard()
  }

  toggleAnswer = () => {
    this.setState((state) => ({
      viewAnswer: !state.viewAnswer
    }))
  }

  setDeck = deck => {
    console.log('in deck setter', deck)
    console.log('in deck setter cards', deck.cards)
    this.setState({currentCards: 'hello'})
    console.log('state of cards', this.state)
    console.log('current cards', this.state.currentCards)
  }

  allCards = () => {
    this.setState({currentCards: this.props.cards})
    console.log('all cards', this.state)
  }

  render () {
    const {term, translation, lexicalInfo,  example} = this.state.currentCard

    if (term === 'No cards to study') {
      return (
        <div className="flashcard-container">
          <div className="flashcard-message">No cards to study</div>
        </div>
      )
    }

    else if (term === 'Click here to study') {
      return (
        <div className="flashcard-container" onClick={() => this.nextCard()}>
          <div className="flashcard-message">Choose a deck to study</div>
          <div className="deck-list" onClick={() => this.allCards()}><a>All Cards</a></div>
          {this.props.decks.map(deck => (
          <div
            key={deck.id}
            className="deck-list"
            onClick={() => {this.setDeck(deck)}}
          >
            <a>{deck.name}</a>
          </div>))}
        </div>
      )
    }

    else if (this.state.viewAnswer) {
      return (
      <div className="flashcard-container">

        <FlashcardRect toggleAnswer={this.toggleAnswer} >
          <div className="card-back">
            <div><b>Translation:</b> {translation}</div>
            <div><b>Lexical Info:</b> {lexicalInfo}</div>
            <div><b>Example:</b> {example}</div>
            <div className="rating-container">
              <div>Rate how well you know this card</div>
              <div className="rating-levels-container">
                <a onClick={() => this.rateCard(1)}>1</a>
                <a onClick={() => this.rateCard(2)}>2</a>
                <a onClick={() => this.rateCard(3)}>3</a>
                <a onClick={() => this.rateCard(4)}>4</a>
                <a onClick={() => this.rateCard(5)}>5</a>
              </div>
            </div>
          </div>
        </FlashcardRect>
      </div>
    )
  } else {
    return (
      <div className="flashcard-container">
      <FlashcardRect toggleAnswer={this.toggleAnswer}>
      <div className="card-front">
        <div>{term}</div>
      </div>
      </FlashcardRect>
      </div>
    )
  }
  }
}

const mapStateToProps = state => ({
  cards: state.cards,
  decks: state.decks,
})

const mapDispatchToProps = dispatch => ({
  editLevel: (cardId, level) => dispatch(editLevel(cardId, level))
})

export default connect(mapStateToProps, mapDispatchToProps)(Flashcard)
