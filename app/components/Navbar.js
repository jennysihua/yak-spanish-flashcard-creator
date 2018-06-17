import React from 'react'
import {Link} from 'react-router-dom'
import {logout} from '../reducers'
import {connect} from 'react-redux'

//disable and set color to transparent if...

const Navbar = props => {
  console.log('params man', props.location.pathname)
  if  (props.user.id) {
    return (
      <nav>
        {props.location.pathname === '/learn' ?
          (<span className="hide-nav">Learn</span>) : (
          <Link to="/learn">
            <span>Learn</span>
          </Link>
        )
        }
        {props.location.pathname === '/cards' ?
          (<span className="hide-nav">Cards</span>) : (
          <Link to="/cards">
            <span>Cards</span>
          </Link>
        )
        }
        {props.location.pathname === '/decks' ?
          (<span className="hide-nav">Decks</span>) : (
          <Link to="/decks">
            <span>Decks</span>
          </Link>
        )
        }
        <a onClick={() => props.logout()}>
          <span>Logout</span>
        </a>
      </nav>
    )
  } else {
      return (
      <nav>
        {props.location.pathname === '/login' ?
          (<span className="hide-nav">Log In</span>) : (
          <Link to="/login">
            <span>Log In</span>
          </Link>
          )
        }
        {props.location.pathname === '/signup' ?
          (<span className="hide-nav">Sign Up</span>) : (
          <Link to="/signup">
            <span>Sign Up</span>
          </Link>
          )
        }
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
