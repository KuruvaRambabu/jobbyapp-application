import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import './index.css'

const apiConstants = {
  fetching: 'FETCHING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Profile extends Component {
  state = {
    apiStatus: apiConstants.initial,
    profileData: {},
  }

  componentDidMount() {
    this.getProfileData()
  }

  onProfileAPISuccess = data => {
    const profileDetails = data.profile_details
    const formattedData = {
      name: profileDetails.name,
      profileImageUrl: profileDetails.profile_image_url,
      shortBio: profileDetails.short_bio,
    }
    console.log(formattedData)
    this.setState({apiStatus: apiConstants.success, profileData: formattedData})
  }

  onProfileAPIFailure = () => {
    this.setState({apiStatus: apiConstants.failure})
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiConstants.fetching})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onProfileAPISuccess(data)
    } else {
      this.onProfileAPIFailure(data)
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {profileData} = this.state

    const {profileImageUrl, shortBio, name} = profileData
    return (
      <div className="profile-details-container">
        <img className="profile-pic" src={profileImageUrl} alt="profile" />
        <p className="profile-name">{name}</p>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <button
      className="profile-retry-btn"
      onClick={this.getProfileData}
      type="button"
    >
      Retry
    </button>
  )

  renderProfileDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.fetching:
        return this.renderLoadingView()
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="profile-card-container">
        {this.renderProfileDetails()}
      </div>
    )
  }
}

export default Profile
