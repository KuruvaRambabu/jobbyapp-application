import {Component} from 'react'

import {withRouter, Link} from 'react-router-dom'

import './index.css'

import withHeader from '../Hocs'

class Home extends Component {
  onClickFindJobs = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  render() {
    return (
      <div>
        <div className="home-bg-img-container">
          <div className="home-page-content">
            <h1 className="heading">Find The Job That Fits Your Life</h1>
            <p className="description">
              Millions of people are searching for jobs, salary, information,
              company reviews. Find the Jobs that fits your abilities and
              potential
            </p>
            <Link to="/jobs">
              <button type="button" className="find-jobs-btn">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(withHeader(Home))
