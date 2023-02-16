import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcase} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData
  return (
    <Link to={`/jobs/${id}`} className="job-card-link-styles">
      <li className="job-card-container">
        <div className="job-logo-container">
          <img className="job-logo" src={companyUrl} alt="company logo" />
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
        <div className="job-description-container">
          <h1 className="description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
