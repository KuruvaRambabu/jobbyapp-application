import {AiFillStar} from 'react-icons/ai'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcase} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {job} = props
  const {
    companyUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = job
  console.log(job)
  return (
    <li className="similar-job-card">
      <div className="similar-job-logo job-logo-container">
        <img
          className="job-logo"
          src={companyUrl}
          alt="similar job company logo"
        />
        <div className="job-role-container">
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="job-description-container">
        <h1 className=" description-heading similar-job-description">
          Description
        </h1>
        <p className="job-description">{jobDescription}</p>
      </div>
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
    </li>
  )
}

export default SimilarJobs
