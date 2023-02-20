import Cookies from 'js-cookie'
import {Link, useNavigate} from 'react-router-dom'
import {RiHome4Fill, RiLogoutBoxRLine} from 'react-icons/ri'
import {BsBriefcase} from 'react-icons/bs'

import './index.css'

const Header = () => {
  const navigate = useNavigate()
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <ul className="header-container">
      <li className="home-page-logo-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo"
          />
        </Link>
      </li>
      <div className="headers-buttons-container">
        <li>
          <Link to="/" className="home-btn header-button" type="button">
            Home
          </Link>
          <Link to="/" className="home-btn-mobile header-button" type="button">
            <RiHome4Fill className="logout-icon" />
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="home-btn header-button" type="button">
            Jobs
          </Link>
          <Link
            to="/jobs"
            className="home-btn-mobile header-button"
            type="button"
          >
            <BsBriefcase className="logout-icon" />
          </Link>
        </li>
      </div>
      <li>
        <button onClick={onClickLogout} className="logout-btn" type="button">
          Logout
        </button>
        <button
          onClick={onClickLogout}
          className="logout-btn-mobile"
          type="button"
        >
          <RiLogoutBoxRLine className="logout-icon" />
        </button>
      </li>
    </ul>
  )
}

export default Header
