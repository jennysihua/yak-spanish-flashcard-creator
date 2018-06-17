import React from 'react'

const FlashcardRect = props => {
  return (
    <div className="flashcard-rect" onClick={() => props.toggleAnswer()}>
      <div className="row">
        <div className="card horizontal">
            {props.children}
        </div>
      </div>
    </div>
  )
}

export default FlashcardRect
