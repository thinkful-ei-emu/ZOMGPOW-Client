import React from 'react';
import StudentAuthApiService from '../../Services/student-auth-api-service';
import { Link } from 'react-router-dom';
import StudentTimer from '../../Components/Timer/StudentTimer';
import StudentContext from '../../Contexts/StudentContext';
import TokenService from '../../Services/token-service';
import './StudentDashboard.css';

class StudentDashboard extends React.Component{
  state = {
    class_id: 1,
    error: null,
    timer: false,
    show: true,
    goal: 'Write a 5 paragraph essay',
    goalComplete: false,
    currentGoal: 'Construct a thesis statement', 
    previousGoals: ['Make a brainmap', 'Read short article for inspiration']
  };
  static contextType = StudentContext;
  renderLogInLinks(){
    return (
      <nav className="login-buttons">
        <Link to='/login/teacher' className='purple-button button'>Teacher Login</Link>
        <Link to='/login/student' className='blue-button button'>Student Login</Link>
        <Link to='/register' className='green-button button'>Sign Up</Link>
      </nav>
    )
  }
  handleLogoutClick = () => {
    this.context.processLogout();
  }
  componentDidMount() {
    StudentAuthApiService.getStudentGoals(this.state.class_id)
      .then(res => console.log(res))
      .catch(res => {
        this.setState({ error: res.error })
      })
  }
 renderStudentLogout(){
  return (
    <nav>
      <Link 
        onClick={this.handleLogoutClick}
        to='/'
        className='green-button button'>
        Logout
      </Link>
    </nav>
  )
 }
toggleTimer = () => {
  // toggle css hidden attribute
  // update state
  this.setState({
    show: !this.state.show,
  })
}

  render() {
    const prevGoals = this.state.previousGoals.map((goal, index) =>
      <li key={index}>{goal}</li>
    );
    return(
      <section className="student-dashboard-section">
        <div className="links">
          {TokenService.hasAuthToken() 
          ? this.renderStudentLogout()
          :this.renderLogInLinks()}
        </div>  
      <div className='goals-container'>
        <h2>Learning Target: </h2>
        <p>{this.state.goal}</p>
        <h2>Current Goal: </h2>
        <p>{this.state.currentGoal}</p>
      </div>
      <div className='timer-container'>
        <button 
        className='button blue-button'
        onClick={this.toggleTimer}>{this.state.show ? 'Hide' : 'Timer'}</button>
        <div className={this.state.show ? '' : 'hidden'}>
          <StudentTimer />
        </div>
      </div>
      {/* <h3>Previous Goals</h3>
      <ul>{prevGoals}</ul> */}
      </section>
    )
  }
}

export default StudentDashboard;