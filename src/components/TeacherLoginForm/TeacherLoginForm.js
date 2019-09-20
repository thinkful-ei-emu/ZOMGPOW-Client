import React from 'react';
import TeacherAuthApiService from '../../Services/teacher-auth-api-service';
import TeacherContext from '../../Contexts/TeacherContext';
import { Link } from 'react-router-dom';
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
            this.context.processLogin(res)
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
            className='teacher-login-form'
            onSubmit={this.handleSubmit}
          >
            <div role='alert' className='alert'>
              {error && <p>{error}</p>}
            </div>
            <h2>Teacher Login</h2>
              <label htmlFor='login-email-input' className="login-labels">
                Email:
              </label>
              <input
                ref={this.firstInput}
                id='login-email-input'
                name='email'
                type='email'
                required
              />
              <label htmlFor='login-password-input' className="login-labels">
                Password:
              </label>
              <input
                id='login-password-input'
                name='password'
                type='password'
                required
              />
            <button type='submit'>
              Login
            </button>
            <div className='login-link'>
              <Link to='/register' >Don't have an account? Sign up!</Link>
            </div>
          </form>
        )
      }
}