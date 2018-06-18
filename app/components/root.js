import React, {Component} from 'react'
import {withRouter, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  getAllCards,
  getAllDecks,
  logout,
  me,
} from '../reducers'
import {
  AllCards,
  SingleCard,
  Navbar,
  AuthForm,
  Home,
  AllDecks,
  SingleDeck,
  Flashcard
} from './'

class Root extends Component {
  componentDidMount () {
    this.props.me()
    this.props.getAllCards()
    this.props.getAllDecks()
  }

  render () {
    return (
      <div>
        <Route path="/" component={Navbar} />
        <Route
          exact path="/"
          render={() => (
            this.props.user.id ? (
              <Redirect to="/learn" />
            ) : (
              <Redirect to="/login" />
            )
          )}
        />
        <Route path="/learn" exact component={Flashcard} />
        <Route path="/home" exact component={Home} />
        <Route path="/cards" exact component={AllCards} />
        <Route path="/cards/:id" exact component={SingleCard} />
        <Route path="/decks" exact component={AllDecks} />
        <Route path="/decks/:id" exact component={SingleDeck} />
        <Route path="/login" exact component={AuthForm} />
        <Route path="/signup" exact component={AuthForm} />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  cards: state.cards,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getAllCards: () => dispatch(getAllCards()),
  getAllDecks: () => dispatch(getAllDecks()),
  logout: () => dispatch(logout()),
  me: () => dispatch(me())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root))
