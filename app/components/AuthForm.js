import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../reducers'

const AuthForm = props => {

  const {error} = props

  const name = props.location.pathname.slice(1)

  const handleSubmit = (event) => {
    event.preventDefault()
    const formName = event.target.name
    const email = event.target.email.value
    const password = event.target.password.value
    props.auth(email, password, formName)
  }

  return (
    <div className="auth-form-container">
      <div className="title-font">{props.location.pathname === '/login' ? 'Log In' : 'Sign Up'}</div>
      <form onSubmit={handleSubmit} name={name} className="auth-form" >
        <div className="auth-fields">
          <div className="row">
            <div className="input-field">
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" />
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" />
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="auth-button"
          >
            <i className="material-icons md-42">arrow_forward_ios</i>
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    error: state.user.error,
  }
}

const mapDispatchToProps = dispatch => ({
  auth: (email, password, formName) =>
    dispatch(auth(email, password, formName))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)
