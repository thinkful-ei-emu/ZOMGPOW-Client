import React, { Component } from 'react'
// import TeacherAuthApiService from '../Services/teacher-auth-api-service'
import TokenService from '../Services/token-service'
// import IdleService from '../Services/idle-service'

const TeacherContext = React.createContext({
  user: {},
  error: null,
  teacherClass: null,
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

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setUser = user => {
    // console.log(user);
    this.setState({ user })
  }

  setClass = teacherClass => {
    this.setState({teacherClass})
  }

  processLogin = response => {

    const authToken = response.authToken;
    const user = response.user;
    const teacherClass = response.class;

    // console.log('user from context', user)
    this.setState({
      user: user,
      teacherClass: teacherClass
    })

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
