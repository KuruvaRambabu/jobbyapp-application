import {useEffect, useState, useContext} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {observer} from 'mobx-react'

import withHeader from '../Hocs'
import Profile from '../Profile'
import DisplayEmploymentTypeFilters from '../DisplayFilters'
import SalaryRangeFilter from '../SalaryRange'
import JobCard from '../JobCard'

import apiConstants from '../constants/apiConstants'
import employmentTypesList from '../constants/employmentTypeConstants'
import salaryRangesList from '../constants/salaryRangeConstants'
import StoresContext from '../context/storeContext'

import './index.css'

const Jobs = observer(() => {
  const [employementFilters, upDateEmployementFilter] = useState([])
  const [salaryRangeFilter, updateSalaryrangeFilter] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const store = useContext(StoresContext)
  const {jobStore} = store
  const {getJobsDataApi} = jobStore

  useEffect(() => {
    getJobsDataApi(employementFilters, salaryRangeFilter, searchInput)
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
        onClick={getJobsDataApi}
        className="profile-retry-btn"
      >
        Retry
      </button>
    </div>
  )

  const renderNoJobsView = () => (
    <div className="no-jobs-found-container ">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="no jobs"
        className="no-jobs-view"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs try other filter.</p>
    </div>
  )

  const renderJobsSuccessView = () => {
    const {jobList} = jobStore

    if (jobList.length > 0) {
      return (
        <ul>
          {jobList.map(jobData => (
            <JobCard key={jobData.id} jobData={jobData} />
          ))}
        </ul>
      )
    }
    return renderNoJobsView()
  }

  const renderJobsRightSideSection = () => {
    const {jobsApiStatus} = jobStore

    switch (jobsApiStatus) {
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
    getJobsDataApi()
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const renderJobsSearchInputField = () => (
    <div className="search-main-container">
      <div className="search-container">
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
  )

  const renderLeftSideSection = () => (
    <div className="jobs-left-section">
      <Profile />
      <hr className="horizontal-line" />
      <p className="filter-heading">Type of Employment</p>
      <ul>
        {employmentTypesList.map(type => (
          <DisplayEmploymentTypeFilters
            onSelectEmploymentType={onSelectEmploymentType}
            key={type.employmentTypeId}
            type={type}
          />
        ))}
      </ul>
      <hr className="horizontal-line" />
      <p className="filter-heading">Salary Range</p>
      <ul>
        {salaryRangesList.map(salaryRange => (
          <SalaryRangeFilter
            onChangeSalaryRange={onChangeSalaryRange}
            key={salaryRange.salaryRangeId}
            salary={salaryRange}
          />
        ))}
      </ul>
    </div>
  )

  return (
    <div className="jobs-main-container">
      <div className="container">
        {renderLeftSideSection()}
        <div className="jobs-right-section">
          {renderJobsSearchInputField()}
          {renderJobsRightSideSection()}
        </div>
      </div>
    </div>
  )
})

export default withHeader(Jobs)
