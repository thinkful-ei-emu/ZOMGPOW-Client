import React from 'react';
import TeacherAuthApiService from '../../services/teacher-auth-api-service'
import TeacherContext from '../../contexts/TeacherContext';
import './TeacherLoginForm.css';


export default class TeacherLoginForm extends React.Component{
    static defaultProps = {
        onLoginSuccess: () => { }
      }
    
      static contextType = TeacherContext
    
      state = { error: null }
    
      firstInput = React.createRef()
    
      handleSubmit = ev => {
        ev.preventDefault()
        const { email, password } = ev.target
    
        this.setState({ error: null })
    
        TeacherAuthApiService.postLogin({
          email: email.value,
          password: password.value,
        })
          .then(res => {
            email.value = ''
            password.value = ''
            this.context.processLogin(res.authToken)
            this.props.onLoginSuccess()
          })
          .catch(res => {
            this.setState({ error: res.error })
          })
      }
    
      componentDidMount() {
        this.firstInput.current.focus()
      }
    
      render() {
        const { error } = this.state
        return (
          <form
            className='LoginForm'
            onSubmit={this.handleSubmit}
          >
            <div role='alert'>
              {error && <p>{error}</p>}
            </div>
            <div className="un" type="text" align="center" placeholder="Username">
              <label htmlFor='login-username-input' className="login-labels">
                Username
              </label>
              <input
                ref={this.firstInput}
                id='login-username-input'
                name='username'
                required
              />
            </div>
            <div className="pass" type="password" align="center" placeholder="password">
              <label htmlFor='login-password-input' className="login-labels">
                Password
              </label>
              <input
                id='login-password-input'
                name='password'
                type='password'
                required
              />
            </div>
            <button className="submit" align="center" type='submit'>
              Login
            </button>
          </form>
        )
      }
}