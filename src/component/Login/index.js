import {Component} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isLoading: false,
    showSubmitError: false,
    errorMessage: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderUsernameInput = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-lable" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          className="username-input"
          id="username"
          value={username}
          placeholder="Username"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordInput = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-lable" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          className="password-input"
          id="password"
          value={password}
          placeholder="Password"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      errorMessage: errorMsg,
      showSubmitError: true,
      isLoading: false,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    this.setState({isLoading: true})
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {errorMessage, showSubmitError, isLoading} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-form-container">
          <div className="website-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </div>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div>{this.renderUsernameInput()}</div>
            <div>{this.renderPasswordInput()}</div>
            {showSubmitError && <p className="error-message">{errorMessage}</p>}
            {isLoading ? (
              <div
                className="loader-container login-button"
                data-testid="loader"
              >
                <Loader type="Oval" color="#ffffff" height="30" width="50" />
              </div>
            ) : (
              <button className="login-button" type="submit">
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
