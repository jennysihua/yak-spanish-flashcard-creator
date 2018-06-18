import React from 'react'
import {connect} from 'react-redux'
import {editDefinition, editExample} from '../reducers'

const SingleCard = props => {

  const card = props.cards ? props.cards.find(crd => {
      return (crd.id === Number(props.match.params.id))
    }) : null

  const cardDefinitions = (card.definition !== 'Not found'
    ) ? (
      <div className="translations-container">
      {card.dictionaryObject.map((definition, index) => {
        if (definition.entries[0].senses[0].translations) {
        return (
        <div key={index} className={`translation ${card.dictionaryIndex === index ? 'selectedExample' : 'notSelectedExample'}`} onClick={() => props.editDefinition(card, index)}>
          {definition.entries[0].senses[0].translations.map(sense => sense.text).join(', ')
          }
        </div>
        )
        } else {
          return <div className="translation notSelectedExample">Not found</div>
        }
      })}
      </div>
    ) : (
      <div className="translation notSelectedExample">'Not found'</div>
    )

  const cardExamples = (card.example !== 'Not found'
    ) ? (
      <div className="examples-container">
      {card.examplesObject.map((example, index) => {
        const output = example.domains ? `(${example.domains}) ${example.text}` : example.text
        return (
          <div key={index} className={`example ${card.examplesIndex === index ? 'selectedExample' : 'notSelectedExample'}`} onClick={() => props.editExample(card, index)}>
            {output}
          </div>
        )
      })}
      </div>
    ) : (
      <div className="example notSelectedExample">'Not found'</div>
    )

  if (card) {
    return (
      <div className="single-card-container">
        <div className="single-card">
          <div className="row">
            <div className="card horizontal">
              <div className="col m3 card-section">
                <div>
                  Term
                </div>
              </div>
              <div className="col m9 card-section term">
                  {card.term}
              </div>
            </div>
          </div>
        </div>
        <div className="single-card">
          <div className="row">
            <div className="card horizontal">
              <div className="col m3 card-section">
                <div>
                  Translations
                </div>
              </div>
              <div className="col m9 card-section">
                {cardDefinitions}
              </div>
            </div>
          </div>
        </div>
        <div className="single-card">
          <div className="row">
            <div className="card horizontal">
              <div className="col m3 card-section">
                <div>
                  Examples
                </div>
              </div>
              <div className="col m9 card-section">
                {cardExamples}
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
  cards: state.cards
})

const mapDispatchToProps = dispatch => ({
  editDefinition: (card, id) => dispatch(editDefinition(card, id)),
  editExample: (card, id) => dispatch(editExample(card, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleCard)
