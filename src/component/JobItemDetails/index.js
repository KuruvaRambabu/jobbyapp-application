import {useEffect, useContext} from 'react'
import Loader from 'react-loader-spinner'
import {useParams} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcase} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {observer} from 'mobx-react'

import withHeader from '../Hocs'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'

import './index.css'
import StoresContext from '../context/storeContext'

const apiConstants = {
  fetching: 'FETCHING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

const JobDetails = observer(() => {
  const store = useContext(StoresContext)
  const {jobStore} = store

  const {
    getJobDetailsApi,
    jobDetailsData,
    similarJobsData,
    jobDetailsApiStatus,
  } = jobStore

  const jobsId = useParams()

  useEffect(() => {
    const {id} = jobsId

    getJobDetailsApi(id)
  }, [])

  const renderJobLoadingView = () => (
    <div className="loader-container jobs-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderJobFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        onClick={getJobDetailsApi}
        className="profile-retry-btn"
      >
        Retry
      </button>
    </div>
  )

  const renderSimilarJobs = () => (
    <div className="similar-jobs-container">
      <h1>Similar jobs</h1>
      <ul className="similar-jobs">
        {similarJobsData.map(job => (
          <SimilarJobs key={job.id} job={job} />
        ))}
      </ul>
    </div>
  )

  const renderLifeAtCompany = lifeAtCompany => {
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="life-at-company-container">
        <h1>Life At Company</h1>
        <div className="life-at-company-content">
          <p className="description-life">{description}</p>
          <img className="life-at-logo" src={imageUrl} alt="life at company" />
        </div>
      </div>
    )
  }

  const renderJobSuccessView = () => {
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetailsData
    return (
      <>
        <div className="job-details-main-container">
          <div className="job-logo-container">
            <img
              className="job-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="job-role-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-salary-container">
            <div className="location-job-type-container">
              <div className="location-container">
                <IoLocationOutline />
                <p className="location-package-content">{location}</p>
              </div>
              <div className="employment-container">
                <BsBriefcase />
                <p className="location-package-content">{employmentType}</p>
              </div>
            </div>
            <p className="location-package-content">{packagePerAnnum}</p>
          </div>
          <hr className="job-card-hr" />
          <div className="job-details-bottom-section">
            <div className="description-container">
              <h1 className="description-heading">Description</h1>
              <a
                href={companyWebsiteUrl}
                className="visit-link"
                rel="noreferrer"
                target="_blank"
              >
                Visit <BiLinkExternal />
              </a>
            </div>
            <p className="job-description">{jobDescription}</p>
            <h1>Skills</h1>

            <ul className="skills-main-container">
              {skills.map(skill => (
                <Skills key={skill.id} skill={skill} />
              ))}
            </ul>
            <div>{renderLifeAtCompany(lifeAtCompany)}</div>
          </div>
        </div>
        <div className="similar-jobs-main-container">{renderSimilarJobs()}</div>
      </>
    )
  }

  const renderJobDetails = () => {
    switch (jobDetailsApiStatus) {
      case apiConstants.fetching:
        return renderJobLoadingView()
      case apiConstants.success:
        return renderJobSuccessView()
      case apiConstants.failure:
        return renderJobFailureView()
      default:
        return ''
    }
  }

  return (
    <div className="job-details-container">
      <div className="job-details-section">{renderJobDetails()}</div>
    </div>
  )
})

export default withHeader(JobDetails)
