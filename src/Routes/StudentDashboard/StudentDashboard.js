import React from 'react';

class StudentDashboard extends React.Component{
  render() {
    return(
      <section>
      <h2>Learning Target: </h2>
      <h2>Current Goal: </h2>
      <button>Hide Timer</button>
      <div>
        Timer displayed to student 
      </div>
      <h2>Previous Goals: </h2>
      </section>
    )
  }
}

export default StudentDashboard;