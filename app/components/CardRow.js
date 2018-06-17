import React from 'react'
import {connect} from 'react-redux'
import {editDefinition, editExample} from '../reducers'
import {Link} from 'react-router-dom'

const CardRow = props => {
  const {card} = props
  const definitionClickHandler = event => {
    const newIndex = (event.target.value === 'prev') ? card.dictionaryIndex - 1 : card.dictionaryIndex + 1
    props.editDefinition(card, newIndex)
  }
  const exampleClickHandler = event => {
    const newIndex = (event.target.value === 'prev') ? card.examplesIndex - 1 : card.examplesIndex + 1
    props.editExample(card, newIndex)
  }

  const dictionaryIndices = card.dictionaryIndices ? card.dictionaryIndices.length : null
  const examplesIndices = card.examplesIndices ? card.examplesIndices.length : null

  return (
    <div className="card-row-container">
      <div className="row">
        <div className="card horizontal">
          <div className="col m3 card-section">
            <div className="card-text">
              <div>{card.term}</div>
              <div className="card-level">Knowledge level: {card.level}</div>
            </div>
          </div>
          <div className="col m3 card-section">
            <div className="card-text">{card.translation}</div>
            <div className="card-button-container">
              <input type="submit" value="prev" onClick={event => definitionClickHandler(event)} disabled={card.dictionaryIndex === 0 ? 'disabled' : false} />
              <span>
                {`${card.dictionaryIndex + 1} / ${dictionaryIndices}`}
              </span>
              <input type="submit" value="next" onClick={event => definitionClickHandler(event)} disabled={(card.dictionaryIndex + 1) === dictionaryIndices ? 'disabled' : false} />
            </div>
          </div>
          <div className="col m3 card-section">
            <div className="card-text">{card.lexicalInfo}</div>
          </div>
          <div className="col m3 card-section">
            <div className="card-text">{card.example}</div>
            {examplesIndices ? (
            <div className="card-button-container">
              <input type="submit" value="prev" onClick={event => exampleClickHandler(event)} disabled={card.examplesIndex === 0 ? 'disabled' : false} />
              <span>
                {`${card.examplesIndex + 1} / ${examplesIndices}`}
              </span>
              <input type="submit" value="next" onClick={event => exampleClickHandler(event)} disabled={(card.examplesIndex + 1) === examplesIndices ? 'disabled' : false} />
            </div>
            ) : (
              <div />
            )
          }
          </div>
        </div>
      </div>
      <div className="editButton">
        <Link to={`/cards/${card.id}`}>
          <span>view / edit</span>
        </Link>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  editDefinition: (card, id) => dispatch(editDefinition(card, id)),
  editExample: (card, id) => dispatch(editExample(card, id))
})

export default connect(null, mapDispatchToProps)(CardRow)
