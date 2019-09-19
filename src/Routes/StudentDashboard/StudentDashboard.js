import React from 'react';
import StudentTimer from '../../Components/Timer/StudentTimer';
import './StudentDashboard.css';

class StudentDashboard extends React.Component{
  state = {
    error: null,
    timer: false,
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

  render() {
    const prevGoals = this.state.previousGoals.map((goal, index) =>
      <li key={index}>{goal}</li>
    );
    return(
      <section className="student-dashboard-section">
      <h3>Learning Target: {this.state.goal}</h3>
      <h3>Current Goal: {this.state.currentGoal} </h3>
      <button>Show/Hide Timer</button>
      <StudentTimer />
      <h3>Previous Goals</h3>
      <ul>{prevGoals}</ul>
      </section>
    )
  }
}

export default StudentDashboard;