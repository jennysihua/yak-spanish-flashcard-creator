import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../reducers'

class AuthForm extends React.Component  {

  constructor () {
    super()
    this.state = {
      error: ' '
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    const formName = event.target.name
    const email = event.target.email.value
    const password = event.target.password.value
    const error = await this.props.auth(email, password, formName)
    console.log(error)
    if (error) {
      this.setState({error})
    }
  }

  render () {
    const name = this.props.location.pathname.slice(1)
    return (
      <div className="auth-form-container">
        <div className="title-font">{this.props.location.pathname === '/login' ? 'Log In' : 'Sign Up'}</div>
        <form onSubmit={this.handleSubmit} name={name} className="auth-form" >
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
            <span className="error-message">{this.state.error}</span>
          </div>
          <div>
            <button
              type="submit"
              className="auth-button">
              <i className="material-icons md-42">arrow_forward_ios</i>
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  auth: (email, password, formName) =>
    dispatch(auth(email, password, formName))
})

export default connect(null, mapDispatchToProps)(AuthForm)
