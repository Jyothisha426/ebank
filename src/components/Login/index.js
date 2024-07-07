import {Redirect} from 'react-router-dom'

import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userIdInput: '', pinInput: '', showSubmitError: false, errMsg: ''}

  onChangeUserIdInput = event => {
    this.setState({userIdInput: event.target.value})
  }

  onChangePinInput = event => {
    this.setState({pinInput: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errMsg: errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()

    const {userIdInput, pinInput} = this.state
    const userDetails = {user_id: userIdInput, pin: pinInput}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userIdInput, pinInput, showSubmitError, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
          alt="website login"
          className="login-img"
        />
        <form className="form" onSubmit={this.submitForm}>
          <h1 className="form-heading">Welcome Back!</h1>
          <div className="input-container">
            <label htmlFor="userId" className="label">
              User ID
            </label>
            <input
              type="text"
              className="input"
              placeholder="Enter User ID"
              value={userIdInput}
              onChange={this.onChangeUserIdInput}
              id="userId"
            />
          </div>
          <div className="input-container">
            <label htmlFor="pin" className="label">
              PIN
            </label>
            <input
              type="password"
              className="input"
              placeholder="Enter PIN"
              value={pinInput}
              onChange={this.onChangePinInput}
              id="pin"
            />
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
          {showSubmitError && <p className="err-msg">{errMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
