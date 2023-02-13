import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'

import withHeader from '../Hocs'
import Profile from '../Profile'

import './index.css'
import DisplayFilters from '../DisplayFilters'
import SalaryRangeFilter from '../SalaryRange'
import JobCard from '../JobCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstants = {
  fetching: 'FETCHING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Jobs extends Component {
  state = {
    jobsData: [],
    employementFilters: [],
    salaryRangeFilter: '',
    apiStatus: apiConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsAPIData()
  }

  onJobsAPISuccess = data => {
    const {jobs} = data
    const formattedJobsData = jobs.map(job => ({
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
      apiStatus: apiConstants.success,
      jobsData: [...formattedJobsData],
    })
    console.log(formattedJobsData)
  }

  onJobsAPIFailure = () => {
    this.setState({apiStatus: apiConstants.failure})
  }

  getJobsAPIData = async () => {
    const {employementFilters, searchInput, salaryRangeFilter} = this.state
    const employmentFilters = employementFilters.join(',')
    this.setState({apiStatus: apiConstants.fetching})

    console.log(employmentFilters, searchInput, salaryRangeFilter)
    console.log(searchInput)

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentFilters}&minimum_package=${salaryRangeFilter}&search=${searchInput}`
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
      this.onJobsAPISuccess(data)
    } else {
      this.onJobsAPIFailure()
    }
  }

  renderJobsLoadingView = () => (
    <div className="loader-container jobs-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        onClick={this.getJobsAPIData}
        className="profile-retry-btn"
      >
        Retry
      </button>
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsData} = this.state

    if (jobsData.length > 0) {
      return (
        <ul>
          {jobsData.map(jobData => (
            <JobCard key={jobData.id} jobData={jobData} />
          ))}
        </ul>
      )
    }
    return (
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          alt="no jobs"
          className="no-jobs-view"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs try other filter.</p>
      </div>
    )
  }

  renderJobsRightSideSection = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.fetching:
        return this.renderJobsLoadingView()
      case apiConstants.success:
        return this.renderJobsSuccessView()
      case apiConstants.failure:
        return this.renderJobsFailureView()
      default:
        return ''
    }
  }

  onSelectEmploymentType = event => {
    const data = event.target.id
    const {employementFilters} = this.state
    const filtersCopy = [...employementFilters]
    const index = filtersCopy.indexOf(data)
    if (index === -1) {
      filtersCopy.push(data)
    } else {
      filtersCopy.splice(index, 1)
    }
    this.setState({employementFilters: [...filtersCopy]}, this.getJobsAPIData)
  }

  onChangeSalaryRange = async event => {
    this.setState({salaryRangeFilter: event.target.id}, this.getJobsAPIData)
  }

  onClickSearchButton = () => {
    this.getJobsAPIData()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getJobsAPIData)
  }

  renderLeftSideSection = () => (
    <>
      <Profile />
      <hr className="horizontal-line" />
      <ul>
        <p className="filter-heading">Type of Employment</p>

        {employmentTypesList.map(type => (
          <DisplayFilters
            onSelectEmploymentType={this.onSelectEmploymentType}
            key={type.employmentTypeId}
            type={type}
          />
        ))}
      </ul>
      <hr className="horizontal-line" />
      <ul>
        <p className="filter-heading">Salary Range</p>
        {salaryRangesList.map(salaryRange => (
          <SalaryRangeFilter
            onChangeSalaryRange={this.onChangeSalaryRange}
            key={salaryRange.salaryRangeId}
            salary={salaryRange}
          />
        ))}
      </ul>
    </>
  )

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-main-container">
        <div className="container">
          <div className="jobs-left-section">
            {this.renderLeftSideSection()}
          </div>
          <div className="jobs-right-section">
            <div className="search-container">
              <div className="search-cont">
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
                <button
                  onClick={this.onClickSearchButton}
                  className="search-icon-btn"
                  type="button"
                  data-testid="searchButton"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            {this.renderJobsRightSideSection()}
          </div>
        </div>
      </div>
    )
  }
}

export default withHeader(Jobs)
