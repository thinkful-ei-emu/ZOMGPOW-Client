import React from 'react';
import StudentTimer from '../../Components/Timer/StudentTimer';
import './StudentDashboard.css';

class StudentDashboard extends React.Component{
  //not sure if we want the isComplete included here or not... 
  state = {
    error: null,
    timer: false,
    goal: 'Write a 5 paragraph essay', //session goal
    goalComplete: false,
    currentGoal:   {
      title:'Construct a thesis statement',  //current goal
      isComplete: false
    },
    previousGoals: [
            {
              title:'Make a brainmap',        //previous goals...
              isComplete: true
            },
            {
              title:'Read short article for inspiration',  
              isComplete: false
            }
          ],
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
      <li key={index}>{goal.title}</li>
    );
    return(
      <section className="student-dashboard-section">
      <h3>Learning Target: {this.state.goal}</h3>
      <h3>Current Goal: {this.state.currentGoal.title} </h3>
      <button>Show/Hide Timer</button>
      <StudentTimer />
      <h3>Previous Goals</h3>
      <ul>{prevGoals}</ul>
      </section>
    )
  }
}

export default StudentDashboard;