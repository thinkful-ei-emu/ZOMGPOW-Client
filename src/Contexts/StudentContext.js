import React, { Component } from 'react';
// import StudentAuthApiService from '../Services/student-auth-api-service';
import TokenService from '../Services/token-service'
// import IdleService from '../Services/idle-service'

const StudentContext = React.createContext({
  user: {},
  error: null,
  setError: () => { },
  clearError: () => { },
  setUser: () => { },
  processLogin: () => { },
  processLogout: () => { },
})

export default StudentContext

export class StudentProvider extends Component {
  constructor(props) {
    super(props)
    const state = { user: {}, error: null }

    const jwtPayload = TokenService.parseAuthToken()

    if (jwtPayload)
      state.user = {
        id: jwtPayload.id,
        username: jwtPayload.user_name,

      }

    this.state = state;
    // IdleService.setIdleCallback(this.logoutBecauseIdle)
  }

  // componentDidMount() {
  //   if (TokenService.hasAuthToken()) {
  //     IdleService.regiserIdleTimerResets()
  //     TokenService.queueCallbackBeforeExpiry(() => {
  //       this.fetchRefreshToken()
  //     })
  //   }
  // }

  // componentWillUnmount() {
  //   IdleService.unRegisterIdleResets()
  //   TokenService.clearCallbackBeforeExpiry()
  // }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setUser = user => {
    console.log(user);
    this.setState({ user })
  }

  processLogin = authToken => {
    TokenService.saveAuthToken(authToken)
    const jwtPayload = TokenService.parseAuthToken()
    console.log(jwtPayload)
    this.setUser({
      id: jwtPayload.id,
      username: jwtPayload.user_name,
    })
    // IdleService.regiserIdleTimerResets()
    // TokenService.queueCallbackBeforeExpiry(() => {
    //   this.fetchRefreshToken()
    // })
  }

  processLogout = () => {
    TokenService.clearAuthToken()
    // TokenService.clearCallbackBeforeExpiry()
    // IdleService.unRegisterIdleResets()
    this.setUser({})
  }

  // logoutBecauseIdle = () => {
  //   TokenService.clearAuthToken()
  //   // TokenService.clearCallbackBeforeExpiry()
  //   // IdleService.unRegisterIdleResets()
  //   this.setUser({ idle: true })
  // }

  // fetchRefreshToken = () => {
  //   StudentAuthApiService.refreshToken()
  //     .then(res => {
  //       TokenService.saveAuthToken(res.authToken)
  //       // TokenService.queueCallbackBeforeExpiry(() => {
  //       //   this.fetchRefreshToken()
  //       // })
  //     })
  //     .catch(err => {
  //       this.setError(err)
  //     })
  // }

  
  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout
    } 
    return (
      <StudentContext.Provider value={value}>
        {this.props.children}
      </StudentContext.Provider>
    )
  }
}
