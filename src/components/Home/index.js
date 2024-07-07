import Cookie from 'js-cookie'

import './index.css'

const Home = props => {
  const onClickLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }
  return (
    <div className="home-container">
      <div className="header">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="logo"
        />
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="main-content">
        <h1 className="home-head">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="digital-card"
        />
      </div>
    </div>
  )
}

export default Home
