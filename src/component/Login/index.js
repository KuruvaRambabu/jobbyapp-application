import {useState, useContext} from 'react'
import {useNavigate, Navigate} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {observer, useLocalObservable} from 'mobx-react'

import StoresContext from '../context/storeContext'
import apiConstants from '../constants/apiConstants'

import './index.css'

const Login = observer(() => {
  const localState = useLocalObservable(() => ({
    username: '',
    password: '',
    errorMessage: '',
    setUsername(event) {
      this.username = event.target.value
    },
    setPassword(event) {
      this.password = event.target.value
    },
    setErrorMsg(errorMsg) {
      this.errorMessage = errorMsg
    },
  }))

  //   const [username, setUsername] = useState('')
  //   const [password, setPassword] = useState('')
  //   const [errorMessage, setErrorMsg] = useState('')

  const store = useContext(StoresContext)
  const {loginStore} = store
  const {onClickLogin, apiStatus} = loginStore

  const navigate = useNavigate()

  //   const onChangeUsername = event => {
  //     setUsername(event.target.value)
  //   }

  const renderUsernameInput = () => (
    <>
      <label className="input-lable " htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        className=" input username-input "
        id="username"
        value={localState.username}
        placeholder="Username"
        onChange={localState.setUsername}
      />
    </>
  )

  //   const onChangePassword = event => {
  //     setPassword(event.target.value)
  //   }

  const renderPasswordInput = () => (
    <>
      <label className="input-lable" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        className="password-input input"
        id="password"
        value={localState.password}
        placeholder="Password"
        onChange={localState.setPassword}
      />
    </>
  )

  const onSubmitSuccess = () => {
    navigate('/', {replace: true})
  }

  const onSubmitFailure = errorMsg => {
    localState.setErrorMsg(errorMsg)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = localState
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
          <p className="error-message">{localState.errorMessage}</p>
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
