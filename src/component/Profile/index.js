import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const apiConstants = {
  fetching: 'FETCHING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

const Profile = () => {
  const [profileApiResponse, updateProfileAPiResponse] = useState({
    apiStatus: apiConstants.initial,
    profileData: {},
  })

  const onProfileAPISuccess = data => {
    const profileDetails = data.profile_details
    const formattedData = {
      name: profileDetails.name,
      profileImageUrl: profileDetails.profile_image_url,
      shortBio: profileDetails.short_bio,
    }
    updateProfileAPiResponse({
      apiStatus: apiConstants.success,
      profileData: formattedData,
    })
  }

  const onProfileAPIFailure = () => {
    updateProfileAPiResponse(prevRes => ({
      ...prevRes,
      apiStatus: apiConstants.failure,
    }))
  }

  const getProfileData = async () => {
    updateProfileAPiResponse(prevRes => ({
      ...prevRes,
      apiStatus: apiConstants.fetching,
    }))
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
      onProfileAPISuccess(data)
    } else {
      onProfileAPIFailure(data)
    }
  }

  useEffect(() => {
    getProfileData()
  }, [])

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderSuccessView = () => {
    const {profileData} = profileApiResponse

    const {profileImageUrl, shortBio, name} = profileData
    return (
      <div className="profile-details-container">
        <img className="profile-pic" src={profileImageUrl} alt="profile" />
        <p className="profile-name">{name}</p>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  const renderFailureView = () => (
    <button
      className="profile-retry-btn"
      onClick={getProfileData}
      type="button"
    >
      Retry
    </button>
  )

  const renderProfileDetails = () => {
    const {apiStatus} = profileApiResponse

    switch (apiStatus) {
      case apiConstants.fetching:
        return renderLoadingView()
      case apiConstants.success:
        return renderSuccessView()
      case apiConstants.failure:
        return renderFailureView()
      default:
        return ''
    }
  }

  return <div className="profile-card-container">{renderProfileDetails()}</div>
}

export default Profile
