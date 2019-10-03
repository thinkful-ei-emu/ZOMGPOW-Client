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
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setUser = user => {
    this.setState({ user })
  }

  processLogin = authToken => {
    TokenService.saveAuthToken(authToken)
    const jwtPayload = TokenService.parseAuthToken()
    this.setUser({
      id: jwtPayload.id,
      username: jwtPayload.user_name,
    })
  }

  processLogout = () => {
    TokenService.clearAuthToken()   
    this.setUser({})
  }
 
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
