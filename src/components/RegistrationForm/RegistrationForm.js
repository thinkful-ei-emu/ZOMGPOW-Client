import React from 'react';
import { Link } from 'react-router-dom';
import TeacherAuthApiService from '../../Services/teacher-auth-api-service';
import './RegistrationForm.css';

class RegistrationForm extends React.Component {
  static defaultProps = { 
    onRegistrationSuccess: () => { } 
  }

  state = { error: null }

  firstInput = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    const {fullName, email, password } = e.target;
    TeacherAuthApiService.postUser({
      fullName: fullName.value,
      email: email.value,
      password: password.value
    })
    .then(user => {
      fullName.value = ''
      email.value = ''
      password.value = ''
      this.props.onRegistrationSuccess();
    })
    .catch(res => {
      this.setState({
        error: res.error
      })
    })
  }

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error } = this.state;

    return (
      <form
        className='form'
        onSubmit={this.handleSubmit}>
        <div className='alert' role='alert'>
        {error && <p>{error}</p>}
        </div>
          <h2>Sign up</h2>
          <label htmlFor='registration-full-name-input'>
          Full Name:
          </label>
          <input
            ref={this.firstInput}
            id='registration-full-name-input'
            name='fullName'
            placeholder='Tammy Teacher'
            aria-label='Registration full name input'
            aria-required='true'
            required />
          <label htmlFor='registration-email-input'>
            E-mail: 
          </label>
          <input
            id='registration-email-input'
            name='email'
            placeholder='teacher@email.com'
            aria-label='Registration email input'
            aria-required='true'
            required />
          <label
            htmlFor='registration-password-input'>
            Password: 
          </label>
          <input 
            id='registration-password-input'
            name='password'
            type='password'
            aria-label='Registration password input'
            aria-required='true'
            required/>
          <button type='submit' className='button purple-button'>
            Sign Up!
          </button>
          {' '}
          <div className='link-to-login'>
            <Link to='/login/teacher' className='login-link'>Already have an account?</Link>
          </div>
      </form>
    )
  }
}

export default RegistrationForm;