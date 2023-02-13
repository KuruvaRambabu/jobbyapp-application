import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcase} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import withHeader from '../Hocs'

import './index.css'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'

const apiConstants = {
  fetching: 'FETCHING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class JobDetails extends Component {
  state = {
    jobData: {},
    similarJobs: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.doJobInfoAPI()
  }

  onJobInfoAPISuccess = data => {
    const jobDetails = data.job_details
    const similarJobs = data.similar_jobs
    const formattedJobDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      lifeAtCompany: jobDetails.life_at_company,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      skills: jobDetails.skills,
      title: jobDetails.title,
    }

    const formattedSimilarJobs = similarJobs.map(job => ({
      companyUrl: job.company_logo_url,
      employmentType: job.employment_type,
      id: job.id,
      jobDescription: job.job_description,
      location: job.location,
      packagePerAnnum: job.package_per_annum,
      rating: job.rating,
      title: job.title,
    }))

    this.setState({
      jobData: formattedJobDetails,
      apiStatus: apiConstants.success,
      similarJobs: formattedSimilarJobs,
    })
  }

  onJobInfoAPIFailure = () => {
    this.setState({apiStatus: apiConstants.failure})
  }

  doJobInfoAPI = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiConstants.fetching})

    const url = `https://apis.ccbp.in/jobs/${id}`
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
      this.onJobInfoAPISuccess(data)
    } else {
      this.onJobInfoAPIFailure()
    }
  }

  renderJobLoadingView = () => (
    <div className="loader-container jobs-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        onClick={this.doJobInfoAPI}
        className="profile-retry-btn"
      >
        Retry
      </button>
    </div>
  )

  getFormattedSkills = skills => {
    const formattedSkils = skills.map(skill => ({
      imageUrl: skill.image_url,
      name: skill.name,
    }))
    return formattedSkils
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state
    return (
      <div className="similar-jobs-container">
        <h1>Similar jobs</h1>
        <ul className="similar-jobs">
          {similarJobs.map(job => (
            <SimilarJobs job={job} />
          ))}
        </ul>
      </div>
    )
  }

  renderLifeAtCompany = lifeAtCompany => {
    const formattedLifeAtCompany = {
      description: lifeAtCompany.description,
      imageUrl: lifeAtCompany.image_url,
    }
    const {description, imageUrl} = formattedLifeAtCompany
    console.log(formattedLifeAtCompany)

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

  renderJobSuccessView = () => {
    const {jobData} = this.state
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
    } = jobData
    const formattedSkills = this.getFormattedSkills(skills)
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
              {formattedSkills.map(skill => (
                <Skills skill={skill} />
              ))}
            </ul>
            <div>{this.renderLifeAtCompany(lifeAtCompany)}</div>
          </div>
        </div>
        <div className="similar-jobs-main-container">
          {this.renderSimilarJobs()}
        </div>
      </>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.fetching:
        return this.renderJobLoadingView()
      case apiConstants.success:
        return this.renderJobSuccessView()
      case apiConstants.failure:
        return this.renderJobFailureView()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="job-details-container">
        <div className="job-details-section">{this.renderJobDetails()}</div>
      </div>
    )
  }
}

export default withHeader(JobDetails)
