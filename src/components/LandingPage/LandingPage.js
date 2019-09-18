import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {

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
        <Link to='/teacher/login'>
          I'm a Teacher
        </Link>
        <Link to='/student/login'>
          I'm a Student
        </Link>
      </div>
    )
  }
}

export default LandingPage;