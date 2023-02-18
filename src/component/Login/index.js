import {useState, useContext} from 'react'
import {useNavigate, Navigate} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {observer} from 'mobx-react'

import StoresContext from '../context/storeContext'

import './index.css'
import apiConstants from '../constants/apiConstants'

const Login = observer(() => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMsg] = useState('')

  const store = useContext(StoresContext)
  const {loginStore} = store
  const {onClickLogin, apiStatus} = loginStore

  const navigate = useNavigate()

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
        className="password-input input"
        id="password"
        value={password}
        placeholder="Password"
        onChange={onChangePassword}
      />
    </>
  )

  const onSubmitSuccess = () => {
    navigate('/', {replace: true})
  }

  const onSubmitFailure = errorMsg => {
    setErrorMsg(errorMsg)
  }

  const onSubmitForm = async event => {
    event.preventDefault()

    const userDetails = {username, password}
    onClickLogin(userDetails, onSubmitSuccess, onSubmitFailure)
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
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
          {renderUsernameInput()}
          {renderPasswordInput()}
          <p className="error-message">{errorMessage}</p>
          {apiStatus === apiConstants.fetching ? (
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
})

export default Login
