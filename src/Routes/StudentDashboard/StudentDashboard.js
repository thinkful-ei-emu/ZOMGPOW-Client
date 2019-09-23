import React from 'react';
import StudentAuthApiService from '../../Services/student-auth-api-service';
import StudentTimer from '../../Components/Timer/StudentTimer';
import StudentContext from '../../Contexts/StudentContext';
import './StudentDashboard.css';

class StudentDashboard extends React.Component{
  state = {
    student_id: null,
    goals: [],
    subgoals: [],
    error: null,
    timer: false,
    show: true,
  };
  static contextType = StudentContext; 

  componentDidMount() {
    this.setState({
      student_id: this.context.user.id
    })
    StudentAuthApiService.getStudentGoals(this.context.user.id)
      .then(res => {
        const student_goals = res.goals;
        const student_subgoals = res.subgoals;
        this.setState({
          goals: student_goals,
          subgoals: student_subgoals
        })
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

toggleTimer = () => {
  // toggle css hidden attribute
  // update state
  this.setState({
    show: !this.state.show,
  })
}

  render() {
    const learningTarget = this.state.goals.map((goal, index) => <li key={index}>{goal.goal_title}</li>)
    return(
      <section className="student-dashboard-section">
      <div className='goals-container'>
        <h2>Learning Target: </h2>
        {/* grabs the first goal for that student */}
        <p>{learningTarget.shift()}</p>
        <h2>Current Goal: </h2>
        {/* grabs the latest goal for that student */}
        <p>{learningTarget.pop()}</p>
      </div>
      <div className='timer-container'>
        <button 
        className='button blue-button'
        onClick={this.toggleTimer}>{this.state.show ? 'Hide' : 'Timer'}</button>
        <div className={this.state.show ? '' : 'hidden'}>
          <StudentTimer />
        </div>
      </div>
      <h3>Previous Goals</h3>
      {/* display all the other goals that student has had */}
      <ul>{learningTarget}</ul>
      </section>
    )
  }
}

export default StudentDashboard;