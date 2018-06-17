import React from 'react'
import {connect} from 'react-redux'
import {Flashcard} from './'

class Learn extends React.Component {
  constructor () {
    super()
    this.state = {
      currentCard: {term: 'Click here to study'}
    }
  }

  clickHandler = () => {
    if (this.props.cards.length) {
      this.setState({currentCard: this.props.cards[Math.floor(Math.random() * this.props.cards.length)]})
    } else {
      this.setState({currentCard: {term: 'No cards to study'}})
    }
  }

  render () {
    return (
      <div>
        <Flashcard clickHandler={this.clickHandler} card={this.state.currentCard} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cards: state.cards
})

export default connect(mapStateToProps, null)(Learn)
