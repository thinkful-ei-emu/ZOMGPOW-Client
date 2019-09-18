import React from 'react';
import { Link } from 'react-router-dom';
// import TeacherAuthApiService from '../../'
import './RegistrationForm.css';

class RegistrationForm extends React.Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    const {full_name, email, password } = e.target;
    TeacherAuthApiService.postUser({
      full_name: full_name.value,
      email: email.value,
      password: password.value
    })
    .then(user => {
      full_name.value = ''
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
        className='registration-form'
        onSubmit={this.handleSubmit}>
        <div className='alert' role='alert'>
        {error && <p>{error}</p>}
        </div>
        <div>
          <label htmlFor='registration-full-name-input'>
          Full Name:
          </label>
          <input
            ref={this.firstInput}
            id='registration-full-name-input'
            name='full-name'
            placeholder='Tammy Teacher'
            aria-label='Registration full name input'
            aria-required='true'
            required />
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
          <button type='submit'>
            Sign Up!
          </button>
          {' '}
          <div>
            <Link to='/login/teacher' className='login-link'>Already have an account?</Link>
          </div>
        </div>
      </form>
    )
  }
}

export default RegistrationForm;