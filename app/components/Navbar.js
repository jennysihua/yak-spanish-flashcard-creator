import React from 'react'
import {Link} from 'react-router-dom'
import {logout} from '../reducers'
import {connect} from 'react-redux'

const Navbar = props => {
  if  (props.user.id) {
    return (
      <nav>
        <Link to="/">
          <span>Learn</span>
        </Link>
        <Link to="/cards">
          <span>Cards</span>
        </Link>
        <Link to="/decks">
          <span>Decks</span>
        </Link>
        <a onClick={() => props.logout()}>
          <span>Logout</span>
        </a>
      </nav>
    )
  } else {
      return (
      <nav>
        <Link to="/login">
          <span>Log In</span>
        </Link>
        <Link to="/signup">
          <span>Sign Up</span>
        </Link>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
