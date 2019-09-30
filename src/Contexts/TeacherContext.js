import React, { Component } from 'react'
import TokenService from '../Services/token-service'

const TeacherContext = React.createContext({
  user: {},
  error: null,
  teacherClass: null,
  sessionStarted: false,
  startSession: () => { },
  endSession: () => { },
  setError: () => { },
  clearError: () => { },
  setUser: () => { },
  setClass: () => { },
  processLogin: () => { },
  processLogout: () => { },
})

export default TeacherContext

export class TeacherProvider extends Component {
  constructor(props) {
    super(props)
    const state = { 
      user: {}, 
      teacherClass: {}, 
      sessionStarted: false,
      error: null 
    }

    const jwtPayload = TokenService.parseAuthToken()

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        full_name: jwtPayload.full_name,
        email: jwtPayload.email,
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

  startSession = () => {
    this.setState({
      sessionStarted: true
    })
  }

  endSession = () => {
    this.setState({
      sessionStarted: false
    })
  }

  setError = error => {
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setUser = user => {
    this.setState({ user })
  }

  setClass = teacherClass => {
    this.setState({teacherClass})
  }

  processLogin = response => {
    console.log(response);
    const authToken = response.authToken;
    const user = response.user;
    const teacherClass = response.class;
    TokenService.saveAuthToken(authToken)
    this.setUser({user})
    this.setClass({teacherClass})

  //   IdleService.regiserIdleTimerResets()
  //   TokenService.queueCallbackBeforeExpiry(() => {
  //     this.fetchRefreshToken()
  //  })
  }

  processLogout = () => {
    TokenService.clearAuthToken()
    // TokenService.clearCallbackBeforeExpiry()
    // IdleService.unRegisterIdleResets()
    this.setUser({})
  }

  // logoutBecauseIdle = () => {
  //   TokenService.clearAuthToken()
  //   TokenService.clearCallbackBeforeExpiry()
  //   IdleService.unRegisterIdleResets()
  //   this.setUser({ idle: true })
  // }

  // fetchRefreshToken = () => {
  //   TeacherAuthApiService.refreshToken()
  //     .then(res => {
  //       TokenService.saveAuthToken(res.authToken)
  //       TokenService.queueCallbackBeforeExpiry(() => {
  //         this.fetchRefreshToken()
  //       })
  //     })
  //     .catch(err => {
  //       this.setError(err)
  //     })
  // }


  render() {
    const value = {
      user: this.state.user,
      teacherClass: this.state.teacherClass,
      error: this.state.error,
      sessionStarted: this.state.sessionStarted,
      startSession: this.startSession,
      endSession: this.endSession,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      setClass: this.setClass,
      processLogin: this.processLogin,
      processLogout: this.processLogout
    }
    return (
      <TeacherContext.Provider value={value}>
        {this.props.children}
      </TeacherContext.Provider>
    )
  }
}
