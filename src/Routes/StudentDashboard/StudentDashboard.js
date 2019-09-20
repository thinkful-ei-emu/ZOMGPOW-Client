import React from 'react';
import StudentTimer from '../../Components/Timer/StudentTimer';
import './StudentDashboard.css';

class StudentDashboard extends React.Component{
  state = {
    error: null,
    timer: false,
    show: true,
    goal: 'Write a 5 paragraph essay',
    goalComplete: false,
    currentGoal: 'Construct a thesis statement', 
    previousGoals: ['Make a brainmap', 'Read short article for inspiration']
  };

//   componentDidMount() {
//  Fetch goals from API -- PSUEDO CODE, need to check with Back End
//       .then(res => {
//         this.setState({
//           goal: res.goal,
//           currentGoal: res.currentGoal,
//           previouGoals: res.previouGoals
//         })
//       })
//       .catch(res => {
//         this.setState({ error: res.error })
//       })
//   }

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
      <div className='goals-container'>
        <h2>Learning Target: </h2>
        <p>{this.state.goal}</p>
        <h2>Current Goal: </h2>
        <p>{this.state.currentGoal}</p>
      </div>
      <div className='timer-container'>
        <button onClick={this.toggleTimer}>{this.state.show ? 'Hide' : 'Timer'}</button>
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