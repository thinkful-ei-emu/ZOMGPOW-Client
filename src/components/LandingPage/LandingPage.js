import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import Placeholder from '../../Images/placeholderimg.svg';

class LandingPage extends React.Component {

  render(){
    return (
      <div className="landing-page">
      <section className='description'>
        <h2>Grow Each Student with Your Feedback</h2>
        <p>
          Sprout is a formative assessment tool used to help
          teachers deliver specific, goal-oriented, and timely feedback in
          the classroom.
        </p>
        <div className='landing-page-link-container'>
        <Link to='/login/teacher' className='teacher'>
          I'm a Teacher
        </Link>
        {' '}
        <Link to='/login/student'className='student'>
          I'm a Student
        </Link>
        </div>
        </section>
        <section className='description gray-background '> 
          <h2>Set and Track Individual Student Goals</h2>
          <div className='info white-card'>
          <p>Sprout helps teachers set and track individual, 
            real-time goals with students to keep them on track 
            to reach the lesson's learning target.
          </p>
          <img src={Placeholder} alt='placeholder' height='300px' width='300px'/>
          </div>
          <div className='info white-card'>
          <img src={Placeholder} alt='placeholder' height='300px' width='300px'/>
          <p>In session, teachers can view all students, the 
            current learning target, and each student's current goal.
          </p>
          
          </div>
          <div className='info white-card'>
          <p>
            Checking in with a student allows teachers to break the learning target
            into smaller goals on an individual basis and choose a check-in priority
            for that student.  Selecting a high priority will alert the teacher that
            the student needs a check-in in X minutes, while a medium priority alerts
            in X minutes, and a low priority in X minutes.  At a glance, teachers 
            can see which students are ready for a check-in and the priority of their
            current goal.
          </p>
          <img src={Placeholder} alt='placeholder' height='300px' width='300px'/>
          </div>
        </section>
        <section className='description'>
        <h2>Exit Ticket Feedback in Real Time</h2>
          <div className='info'>
          <p>paragraph</p>
          <img src={Placeholder} alt='placeholder' height='300px' width='300px'/>
          </div>
        </section>
        <section className='description top-border sprout-background'>
        <h2>Data Collection and Grouping</h2>
          <div className='info white-card'>
          <p>paragraph</p>
          <img src={Placeholder} alt='placeholder' height='300px' width='300px'/>
          </div>
        </section>
        {/* <section className='description top-border'>
        <h2>Video or gif tutorial?</h2>
          Video or gif tutorial?
        </section> */}
        {/* <section className='description top-border'>
        <h2>Sprout Demo</h2>
          <p>Discover what Sprout has to offer:</p>
          <p>Username: Teacher1</p>
          <p>Password: Teacher1pass!</p>
        </section> */}
      </div>
    )
  }
}

export default LandingPage;