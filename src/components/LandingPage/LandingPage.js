import React from 'react';
import './LandingPage.css';

class LandingPage extends React.Component {

  handleTeacher = () => {
    console.log('push/link to teacher login')
    // this.props.history.push('/teacer-login')
  }

  handleStudent = () => {
    console.log('push/link to student login')
    // this.props.history.push('/student-login')
  }
  render(){
    return (
      <div className="landing-page">
        <h2>Application Introduction</h2>
        <p>
          App title is first and foremost a teacher tool designed to 
          be used during classtime in order to set individual student goals real-time. 
          Increasing the quality of formative assessments for both 
          teachers and students...
        </p>
        <button onClick={this.handleTeacher}>
          I'm a Teacher
        </button>
        <button onClick={this.handleStudent}>
          I'm a Student
        </button>
      </div>
    )
  }
}

export default LandingPage;