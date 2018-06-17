import React from 'react'
import {connect} from 'react-redux'
import {FlashcardRect} from './'
import {editLevel} from '../reducers'

class Flashcard extends React.Component {
  constructor () {
    super()
    this.state = {
      currentCard: {term: 'Click here to study'},
      viewAnswer: false
    }
  }

  nextCard = () => {
    if (this.props.cards.length) {
      this.setState({currentCard: this.props.cards[Math.floor(Math.random() * this.props.cards.length)]})
    } else {
      this.setState({currentCard: {term: 'No cards to study'}})
    }
  }

  rateCard = () => {
    console.log('HERE')
    this.props.editLevel(this.state.currentCard.id, 5)
  }

  toggleAnswer = () => {
    console.log('TOGGGLE')
    this.setState((state) => ({
      viewAnswer: !state.viewAnswer
    }))
  }

  render () {
    console.log('PROPS', this.props)
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
          <div className="flashcard-message">Click here to study</div>
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
          </div>
        </FlashcardRect>
        <div onClick={() => this.rateCard()}>Rate me</div>
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
  cards: state.cards
})

const mapDispatchToProps = dispatch => ({
  editLevel: (cardId, level) => dispatch(editLevel(cardId, level))
})

export default connect(mapStateToProps, mapDispatchToProps)(Flashcard)
