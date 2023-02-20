import {Link} from 'react-router-dom'

import './index.css'
import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="home-bg-img-container">
      <div className="home-page-content">
        <h1 className="heading">Find The Job That Fits Your Life</h1>
        <p className="description">
          Millions of people are searching for jobs, salary, information,
          company reviews. Find the Jobs that fits your abilities and potential
        </p>
        <Link to="/jobs" className="find-jobs-btn">
          Find Jobs
        </Link>
      </div>
    </div>
  </>
)
export default Home
