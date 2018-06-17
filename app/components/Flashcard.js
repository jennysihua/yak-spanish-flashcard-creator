import React from 'react'
import {connect} from 'react-redux'
import {FlashcardRect} from './'
import {editLevel} from '../reducers'

class Flashcard extends React.Component {
  constructor () {
    super()
    this.state = {
      currentCard: {},
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

  setDeck = async deck => {
    await this.setState({currentCards: deck.cards})
    await this.setState({currentCard: deck.cards[Math.floor(Math.random() * deck.cards.length)]})
    console.log(this.state, 'in setdeck')
  }

  allCards = async () => {
    await this.setState({currentCards: this.props.cards})
    await this.setState({currentCard: this.props.cards[Math.floor(Math.random() * this.props.cards.length)]})
    console.log('all cards', this.state)
  }

  render () {
    const {term, translation, lexicalInfo, example} = this.state.currentCard

    if (!this.props.cards.length) {
      return (
        <div className="flashcard-container">
          <div className="flashcard-message">No cards to study</div>
        </div>
      )
    }

    else if (!this.state.currentCard.term) {
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
