import React from 'react'
import './StudentLoginRoute.css'
import StudentAuthApiService from '../../Services/student-auth-api-service'
import StudentContext from '../../Contexts/StudentContext';


class StudentLoginRoute extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }
  static contextType = StudentContext

  state = {
    error: null,
  }

  onLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/dashboard/student'
    history.push(destination)
  }
  
  
  
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.context)
    const {student_username} = e.target
    console.log(student_username.value);
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
        <form className="student-login-form" onSubmit={this.handleSubmit}>
          <div role='alert'>
          {error && <p>{error}</p>}
          </div>
          <h2>Student Login</h2>
          <label>Username:</label><br></br>
          <input className= "student-username" name="student_username" required></input><br></br>
          <button type="submit">Submit</button>
          <div className='student-help'>
            <p>Forgot your username?</p>
            <p>Ask your teacher for help.</p>
          </div>
        </form>
   
      </div>
    );
  }
  
}

export default StudentLoginRoute;