import React from 'react'
import {connect} from 'react-redux'
import {getAllDecks, addNewDeck} from '../reducers'
import {DeckRow, AllItemsHeader} from './'
import Modal from 'react-modal';

class AllDecks extends React.Component {

  constructor () {
    super()
    this.state = {
      modalIsOpen: false,
      name: '',
      description: '',
    }
  }

  openModal = () => {
    this.setState({modalIsOpen: true})
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  changeHandler = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.props.addNewDeck({
      name: this.state.name,
      description: this.state.description,
      userId: this.props.user.id,
    })
    this.setState({modalIsOpen: false});
  }

  render () {
    return (
      <div className="all-decks-container">
        <AllItemsHeader labels={['Name', 'Description', 'Number of Cards', 'Date Created']} />
        {this.props.decks.map(deck => <DeckRow key={deck.id} deck={deck} />)}
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
          <input name="name" type="text" onChange={event => this.changeHandler(event)} />
          <input name="description" type="text" onChange={event => this.changeHandler(event)} />
          <button onClick={event => this.submitHandler(event)} type="submit" className="submit-modal-button">submit</button>
          <button onClick={this.closeModal} type="submit" className="close-modal-button"><i className="material-icons">close</i></button>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  decks: state.decks
})

const mapDispatchToProps = dispatch => ({
  getAllDecks: () => dispatch(getAllDecks()),
  addNewDeck: words => dispatch(addNewDeck(words)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllDecks)
