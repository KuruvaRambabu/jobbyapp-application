import {makeAutoObservable} from 'mobx'

import Cookies from 'js-cookie'
import apiConstants from '../../component/constants/apiConstants'

import JobDataModel from './models/jobsDatamodel'
import ProfileDetailsModel from './models/profileDetailsModel'
import JobDetailsModel from './models/jobDetails'

const jwtToken = Cookies.get('jwt_token')

class JobsStore {
  jobList = []

  jobsApiStatus = apiConstants.initial

  jobsApiErrorMessage = null

  profileApiStatus = apiConstants.initial

  profileApiErrorMessage = null

  profileData = {}

  jobDetailsApiStatus = apiConstants.initial

  jobDetailsApiErrorMessage = null

  jobDetailsData = {}

  similarJobsData = []

  constructor() {
    makeAutoObservable(this)
  }

  getJobsDataApi = async (
    employementFilters,
    salaryRangeFilter,
    searchInput,
  ) => {
    this.jobsApiStatus = apiConstants.fetching

    const employmentFilters = employementFilters.join(',')
    this.apiStatus = apiConstants.fetching

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentFilters}&minimum_package=${salaryRangeFilter}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    this.jobList = data
    if (response.ok === true) {
      this.onjobsApiSuccess(data)
    } else {
      this.onJobsApiFailure()
    }
  }

  onjobsApiSuccess = data => {
    const {jobs} = data

    this.jobList = jobs.map(jobData => new JobDataModel(jobData))
    this.jobsApiStatus = apiConstants.success
  }

  onJobsApiFailure = () => {
    this.jobsApiStatus = apiConstants.failure
  }

  getProfileData = async () => {
    this.profileApiStatus = apiConstants.fetching
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onUserProfileApiSuccess(data)
    } else {
      this.onUserProfileApiFailure()
    }
  }

  onUserProfileApiSuccess(data) {
    const profileDetails = data.profile_details
    this.profileData = new ProfileDetailsModel(profileDetails)
    this.profileApiStatus = apiConstants.success
  }

  onUserProfileApiFailure() {
    this.profileApiStatus = apiConstants.failure
  }

  getJobDetailsApi = async id => {
    this.jobDetailsApiStatus = apiConstants.fetching

    const url = `https://apis.ccbp.in/jobs/${id}`
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

  onJobInfoAPISuccess(data) {
    const jobDetails = data.job_details
    const similarJobs = data.similar_jobs
    this.jobDetailsData = new JobDetailsModel(jobDetails)
    this.similarJobsData = similarJobs.map(
      similarJob => new JobDataModel(similarJob),
    )
    this.jobDetailsApiStatus = apiConstants.success
  }

  onJobInfoAPIFailure() {
    this.jobDetailsApiStatus = apiConstants.failure
  }
}

export default JobsStore
