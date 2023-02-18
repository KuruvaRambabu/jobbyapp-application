Stores

- LoginStore
- JobsStore

LoginStore

Observables

- apiStatus : string
- errorMessage :string

Methods

- OnClickLogin()
- onLoginApiSuccess()
- onLoginApiFailure()
- onClickLogout()

**JobsStore**

_Observables_

- JobsData = []
- jobsApiStatus
- jobsApiErrorMsg

- profileApiStatus
- profileApiErrorMessage
- profileData={}

- jobDetailsApiStatus
- jobDetailsApiErrorMessage
- jobDetailsData = []

**Methods**

- getJobsApiData()
- for fetching the jobs data
- for fetching data based on user filters
- onjobsApiSuccess()
- onJobsApiFailure()

- getUserProfileDataApi()
- for getting user profile details
- onUserProfileApiSuccess()
- onUserProfileApiFailure()

- getJobDetailsApi(id)
- onJobDetailsApiSuccess()
- onJobDetailsApiFailure()
