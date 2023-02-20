import Cookies from 'js-cookie'

import {Navigate} from 'react-router-dom'

const ProtectedRoute = props => {
  const {component: Component} = props
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Navigate to="/login" replace />
  }
  return <Component {...props} />
}

export default ProtectedRoute
