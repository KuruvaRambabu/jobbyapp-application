import {makeAutoObservable} from 'mobx'
import Cookies from 'js-cookie'
import apiConstants from '../../component/constants/apiConstants'

class LoginStore {
  apiStatus = apiConstants.initial

  errorMessage = null

  constructor() {
    makeAutoObservable(this)
  }

  onClickLogin = async (userDetails, onSubmitSuccess, onSubmitFailure) => {
    this.apiStatus = apiConstants.fetching
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onLoginApiSuccess(data.jwt_token)
      onSubmitSuccess()
    } else {
      onSubmitFailure(data.error_msg)
      this.onLoginApiFailure(data.error_msg)
    }
  }

  onLoginApiSuccess(jwtToken) {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    this.apiStatus = apiConstants.success
  }

  onLoginApiFailure(errMsg) {
    this.apiStatus = apiConstants.failure
    this.errorMessage = errMsg
  }
}

export default LoginStore
