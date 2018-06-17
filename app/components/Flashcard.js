import React from 'react'
import {connect} from 'react-redux'

class Flashcard extends React.Component {
  constructor () {
    super()
    this.state = {
      viewAnswer: false
    }
  }

  toggleAnswer = () => {
    this.setState((state) => ({
      viewAnswer: !state.viewAnswer
    }))
  }

  render () {
    console.log('PROPS', this.props)
    const {term, translation, definition, lexicalInfo,  example} = this.props.card

    if (term === 'No cards to study') {
      return (
        <div className="flashcard-container">
          No cards to study
        </div>
      )
    }

    else if (term === 'Click here to study') {
      return (
        <div className="flashcard-container">
          Click here to study
        </div>
      )
    }

    else {
      return (
      <div className="flashcard-container">
        <div className="row">
          <div className="card horizontal" onClick={() => this.toggleAnswer()}>
            <div className="col s10 m6 offset-s1 offset-m3">
              <div className="card-front">
                <div>{term}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card horizontal" onClick={() => this.toggleAnswer()}>
            <div className="col s10 m6 offset-s1 offset-m3">
              <div className="card-back">
                <div>Translation: {translation}</div>
                <div>Definition: {definition}</div>
                <div>Lexical Info: {lexicalInfo}</div>
                <div>Example: {example}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  }
}

export default connect(null, null)(Flashcard)
