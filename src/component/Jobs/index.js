import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'

import withHeader from '../Hocs'
import Profile from '../Profile'
import DisplayFilters from '../DisplayFilters'
import SalaryRangeFilter from '../SalaryRange'
import JobCard from '../JobCard'

import './index.css'

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

const Jobs = () => {
  const [employementFilters, upDateEmployementFilter] = useState([])
  const [salaryRangeFilter, updateSalaryrangeFilter] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [apiResponse, updateAPIResponse] = useState({
    jobsData: [],
    apiStatus: apiConstants.initial,
  })

  const onJobsAPISuccess = data => {
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

    updateAPIResponse({
      apiStatus: apiConstants.success,
      jobsData: [...formattedJobsData],
    })

    console.log(formattedJobsData)
  }

  const onJobsAPIFailure = () => {
    updateAPIResponse(prevResponse => ({
      ...prevResponse,
      apiStatus: apiConstants.failure,
    }))
  }

  const getJobsAPIData = async () => {
    const employmentFilters = employementFilters.join(',')
    updateAPIResponse(prevResponse => ({
      ...prevResponse,
      apiStatus: apiConstants.fetching,
    }))

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
      onJobsAPISuccess(data)
    } else {
      onJobsAPIFailure()
    }
  }
  useEffect(() => {
    getJobsAPIData()
  }, [employementFilters, salaryRangeFilter, searchInput])

  const renderJobsLoadingView = () => (
    <div className="loader-container jobs-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderJobsFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        onClick={getJobsAPIData}
        className="profile-retry-btn"
      >
        Retry
      </button>
    </div>
  )

  const renderJobsSuccessView = () => {
    const {jobsData} = apiResponse

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

  const renderJobsRightSideSection = () => {
    const {apiStatus} = apiResponse

    switch (apiStatus) {
      case apiConstants.fetching:
        return renderJobsLoadingView()
      case apiConstants.success:
        return renderJobsSuccessView()
      case apiConstants.failure:
        return renderJobsFailureView()
      default:
        return ''
    }
  }

  const onSelectEmploymentType = event => {
    const data = event.target.id

    const filtersCopy = [...employementFilters]
    const index = filtersCopy.indexOf(data)
    if (index === -1) {
      filtersCopy.push(data)
    } else {
      filtersCopy.splice(index, 1)
    }
    upDateEmployementFilter([...filtersCopy])
  }

  const onChangeSalaryRange = async event => {
    updateSalaryrangeFilter(event.target.id)
  }

  const onClickSearchButton = () => {
    getJobsAPIData()
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const renderLeftSideSection = () => (
    <>
      <Profile />
      <hr className="horizontal-line" />
      <ul>
        <p className="filter-heading">Type of Employment</p>

        {employmentTypesList.map(type => (
          <DisplayFilters
            onSelectEmploymentType={onSelectEmploymentType}
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
            onChangeSalaryRange={onChangeSalaryRange}
            key={salaryRange.salaryRangeId}
            salary={salaryRange}
          />
        ))}
      </ul>
    </>
  )

  return (
    <div className="jobs-main-container">
      <div className="container">
        <div className="jobs-left-section">{renderLeftSideSection()}</div>
        <div className="jobs-right-section">
          <div className="search-container">
            <div className="search-cont">
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={onChangeSearchInput}
              />
              <button
                onClick={onClickSearchButton}
                className="search-icon-btn"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
          </div>
          {renderJobsRightSideSection()}
        </div>
      </div>
    </div>
  )
}

export default withHeader(Jobs)
