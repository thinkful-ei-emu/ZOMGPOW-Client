import React from 'react';
import StudentTimer from '../../Components/Timer/StudentTimer';
import './StudentDashboard.css';

class StudentDashboard extends React.Component{
  state = {
    error: null,
    studentName: 'studentA',
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
          ]
  }


  render() {
    return(
      <section>
      <h2>Learning Target: </h2>
      <h2>Current Goal: </h2>
      <button>Hide Timer</button>
      <StudentTimer />
      <h2>Previous Goals: </h2>
      </section>
    )
  }
}

export default StudentDashboard;