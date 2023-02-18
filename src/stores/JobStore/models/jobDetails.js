import SkillsDataModel from './skillsDataModel'

class JobDetailsModel {
  companyLogoUrl

  companyWebsiteUrl

  employmentType

  id

  jobDescription

  lifeAtCompany

  location

  packagePerAnnum

  rating

  skills

  title

  constructor(jobDetails) {
    this.companyLogoUrl = jobDetails.company_logo_url
    this.companyWebsiteUrl = jobDetails.company_website_url
    this.employmentType = jobDetails.employment_type
    this.id = jobDetails.id
    this.jobDescription = jobDetails.job_description
    this.lifeAtCompany = {
      description: jobDetails.life_at_company.description,
      imageUrl: jobDetails.life_at_company.image_url,
    }
    this.location = jobDetails.location
    this.packagePerAnnum = jobDetails.package_per_annum
    this.rating = jobDetails.rating
    this.skills = jobDetails.skills.map(skill => new SkillsDataModel(skill))
    this.title = jobDetails.title
  }
}

export default JobDetailsModel
