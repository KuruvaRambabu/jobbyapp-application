import {useState} from 'react'
import {withRouter, Redirect, useHistory} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoadingStatus] = useState(false)
  const [showSubmitError, setSubmitError] = useState(false)
  const [errorMessage, setErrorMsg] = useState('')
  const history = useHistory()

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const renderUsernameInput = () => (
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
        onChange={onChangeUsername}
      />
    </>
  )

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const renderPasswordInput = () => (
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
        onChange={onChangePassword}
      />
    </>
  )

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  const onSubmitFailure = errorMsg => {
    setErrorMsg(errorMsg)
    setLoadingStatus(false)
    setSubmitError(true)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    setLoadingStatus(true)
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

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
        <form className="form-container" onSubmit={onSubmitForm}>
          <div>{renderUsernameInput()}</div>
          <div>{renderPasswordInput()}</div>
          {showSubmitError && <p className="error-message">{errorMessage}</p>}
          {isLoading ? (
            <div className="loader-container login-button" data-testid="loader">
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

export default withRouter(Login)
