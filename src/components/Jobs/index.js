import {Component} from 'react'
import Header from '../Header'
import Profile from '../Profile'
import Filters from '../Filters'
import './index.css'

class Jobs extends Component {
  state = {
    jobsList: [],
    activeEmploymentTypeId: [],
    activeSalaryRangeId: '',
  }

  changeEmployeeType = value => {
    this.setState(prevState => ({
      activeEmploymentTypeId: [...prevState.activeEmploymentTypeId, value],
    }))
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    return (
      <>
        <Header />
        <div className="jobs">
          <div className="profile-filters-section">
            <Profile />
            <Filters
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeEmployeeType={this.changeEmployeeType}
            />
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
