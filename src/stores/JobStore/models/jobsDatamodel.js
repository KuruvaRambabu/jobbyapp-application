class JobDataModel {
  companyUrl

  employmentType

  id

  jobDescription

  location

  packagePerAnnum

  rating

  title

  constructor(job) {
    this.companyUrl = job.company_logo_url
    this.employmentType = job.employment_type
    this.id = job.id
    this.jobDescription = job.job_description
    this.location = job.location
    this.packagePerAnnum = job.package_per_annum
    this.rating = job.rating
    this.title = job.title
  }
}

export default JobDataModel
