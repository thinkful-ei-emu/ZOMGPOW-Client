import React from './node_modules/react';
import './LandingPage.css';
import { Link } from './node_modules/react-router-dom';

class LandingPage extends React.Component {

  render(){
    return (
      <div className="landing-page">
        <h2>Grow Each Student with Your Feedback</h2>
        <p>
          Sprout is a formative assessment tool used to help
          teachers deliver specific, goal-oriented, and timely feedback in
          the classroom.
        </p>
        <div className='landing-page-link-container'>
        <Link to='/register' className='teacher'>
          I'm a Teacher
        </Link>
        {' '}
        <Link to='/login/student'className='student'>
          I'm a Student
        </Link>
        </div>
      </div>
    )
  }
}

export default LandingPage;