import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {

  render(){
    return (
      <div className="landing-page">
        <p>
          Sprout is first and foremost a teacher tool designed to 
          be used during classtime in order to set individual student goals real-time. 
          Increasing the quality of formative assessments for both 
          teachers and students...
        </p>
        <div className="landing-links">
          <Link to='/register'>
            I'm a Teacher
          </Link>
          {' '}
          <Link to='/login/student'>
            I'm a Student
          </Link>
        </div>
      </div>
    )
  }
}

export default LandingPage;