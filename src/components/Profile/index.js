import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Profile extends Component {
  state = {status: apiStatus.initial, profileData: {}}

  componentDidMount = () => {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({status: apiStatus.inProgress})

    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)
    const data = await response.json()
    const fetchedData = data.profile_details
    const updatedData = {
      name: fetchedData.name,
      profileImageUrl: fetchedData.profile_image_url,
      shortBio: fetchedData.short_bio,
    }
    if (response.ok === true) {
      this.setState({status: apiStatus.success, profileData: updatedData})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-details">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  renderView = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.renderProfile()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <div className="profile">{this.renderView()}</div>
  }
}
export default Profile
