import React from 'react'
import {connect} from 'react-redux'
import {getAllCards, addNewCards} from '../reducers'
import {CardRow, AllItemsHeader} from './'
import Modal from 'react-modal';

class AllCards extends React.Component {

  constructor () {
    super()
    this.state = {
      modalIsOpen: false,
      words: ''
    }
  }


  openModal = () => {
    this.setState({modalIsOpen: true})
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  changeHandler = (event) => {
    this.setState({words: event.target.value})
  }

  submitHandler = (event) => {
    event.preventDefault()
    const words = this.state.words.split('\n')
    this.props.addNewCards(words)
    this.setState({modalIsOpen: false});
  }

  render () {
    return (
      <div>
        <AllItemsHeader labels={['Term', 'Translation', 'Lexical Info', 'Example']} />
        <div className="all-cards-container">
        {this.props.cards.map(card => (<CardRow
            key={card.id}
            card={card} />))}
        </div>
        <button className="addButton" onClick={this.openModal} type="submit">
          <i className="material-icons md-36">add_circle_outline</i>
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          className="input-new-modal"
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <textarea name="add" className="input-new-textarea" onChange={event => this.changeHandler(event)} />
          <button onClick={event => this.submitHandler(event)} type="submit" className="submit-modal-button">submit</button>
          <button onClick={this.closeModal} type="submit" className="close-modal-button"><i className="material-icons">close</i></button>

        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cards: state.cards
})

const mapDispatchToProps = dispatch => ({
  getAllCards: () => dispatch(getAllCards()),
  addNewCards: words => dispatch(addNewCards(words))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllCards)
