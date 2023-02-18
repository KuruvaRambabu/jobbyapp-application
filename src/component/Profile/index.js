import {useEffect, useContext} from 'react'
import Loader from 'react-loader-spinner'
import {observer} from 'mobx-react'

import apiConstants from '../constants/apiConstants'

import './index.css'
import StoresContext from '../context/storeContext'

const Profile = observer(() => {
  const store = useContext(StoresContext)

  const {jobStore} = store
  const {profileApiStatus, profileData, getProfileData} = jobStore

  useEffect(() => {
    getProfileData()
  }, [])

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderSuccessView = () => {
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
    switch (profileApiStatus) {
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
})

export default Profile
