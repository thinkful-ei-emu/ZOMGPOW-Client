import React from 'react'
import './student-login.css'
import StudentAuthApiService from '../../services/student-auth-api-service'
import StudentContext from '../../components/contexts/StudentContext';


class StudentLogin extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  state = {
    error: null,
  }

  onLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }
  
  
  
  handleSubmit = e => {
    e.preventDefault();
    const {username} = e.target
    this.setState({ error: null })

    StudentAuthApiService.postLogin({
      username: username.value,     
    })
      .then(res => {
        username.value = ''       
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
        <label>Username:</label><br></br>
          <input className= "student-username" name="student-username" required></input><br></br>
          <button type="submit">Submit</button>
        </form>
   
      </div>
    );
  }
  
}

export default StudentLogin;