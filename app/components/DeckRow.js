import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const DeckRow = props => {

  const {deck} = props

  return (
    <div className="card-row-container deck-row">
      <div className="row">
        <div className="card horizontal">
          <div className="col m3 card-section">
            <div className="card-text">{deck.name}</div>
          </div>
          <div className="col m3 card-section">
            <div className="card-text">{deck.description}</div>
          </div>
          <div className="col m3 card-section">
            <div className="card-text">{deck.cards ? deck.cards.length : 0}</div>
          </div>
          <div className="col m3 card-section">
            <div className="card-text">{Date(deck.createdAt)}</div>
          </div>
        </div>
      </div>
      <div className="editButton">
        <Link to={`/decks/${deck.id}`}>
          <span>view / edit</span>
        </Link>
      </div>
    </div>
  )
}

export default connect(null, null)(DeckRow)
