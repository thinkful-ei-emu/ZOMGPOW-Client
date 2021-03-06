import React from 'react'
import './StudentLoginRoute.css'
import StudentAuthApiService from '../../Services/student-auth-api-service'
import StudentContext from '../../Contexts/StudentContext';
import config from '../../config';


class StudentLoginRoute extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }
  static contextType = StudentContext;

  state = {
    error: null,
  }

  onLoginSuccess = () => {
    this.props.handleHeaderType(config.STUDENT);
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/dashboard/student'
    history.push(destination)
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const {student_username} = e.target;
    this.setState({ error: null })

    StudentAuthApiService.postLogin(student_username.value)
      .then(res => {
        student_username.value = ''       
        this.context.processLogin(res.authToken)
        this.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const {error} = this.state;
    return (
      <div className="student-login">
        <form className="form" onSubmit={this.handleSubmit}>
          <div role='alert'>
          {error && <p>{error}</p>}
          </div>
          <h2>Student Login</h2>
          <label>Username:</label>
          <input name="student_username" required></input>
          <button type="submit" className='button blue-button'>Submit</button>
          <div className='student-help'>
            <span>Forgot your username?</span>
            <br />
            <span>Ask your teacher for help.</span>
          </div>
        </form>
      </div>
    );
  }
}

export default StudentLoginRoute;