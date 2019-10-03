import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import PurpleSprout from '../../Images/purple-sprout.svg';
import BlueSprout from '../../Images/blue-sprout.svg';
import SproutInAction from '../../Images/SproutInAction2.png';
import Priority from '../../Images/Priority.png';
import ExitTicket from '../../Images/ExitTicket.png';

class LandingPage extends React.Component {

  render() {
    return (
      <div className="landing-page">
        <section className='description'>
          <h2>Grow Each Student with Your Feedback</h2>
          <p className='app-description'>
            Sprout is a formative assessment tool used to help
            teachers deliver specific, goal-oriented, and timely feedback in
            the classroom.
        </p>
          <div className='landing-page-link-container'>
            <Link to='/login/teacher' className='teacher'>
              I'm a Teacher
        </Link>
            {' '}
            <Link to='/login/student' className='student'>
              I'm a Student
        </Link>
          </div>
        </section>
        <section className='description gray-background '>
          <img src={PurpleSprout} alt='sprout' height='100px' width='100px' />
          <h2>Set and Track Individual Student Goals</h2>
          <div className='info white-card'>
            <p>Sprout helps teachers set and track individual,
              real-time goals with students to keep them on track
              to reach the lesson's learning target.
          </p>
            <img src={SproutInAction} alt='session page of app' className='sprout-images' />
          </div>
          <div className='info white-card middle'>
            <p>In session, teachers can view all students, the
              current learning target, and each student's current goal.
          </p>

          </div>
          <div className='info white-card'>
            <p>
              Checking in with a student allows teachers to break the learning target
              into smaller goals on an individual basis and choose a check-in priority
              for that student.  Selecting a high priority will alert the teacher that
              the student needs a check-in in 5 minutes, while a medium priority alerts
              in 10 minutes, and a low priority in 15 minutes.  At a glance, teachers
              can see which students are ready for a check-in and the priority of their
              current goal.
          </p>
            <img src={Priority} alt='placeholder' height='400px'  />
          </div>
        </section>
        <section className='description'>
          <img src={BlueSprout} alt='sprout' height='100px' width='100px' />
          <h2>Exit Ticket Feedback in Real Time</h2>
          <div className='info blue-card'>
            <p className='info'>Teachers can include exit tickets when assigning a learning goal.
              After ending a session, student responses to the exit ticket can be
              monitored in real-time.
          </p>
            <img src={ExitTicket} alt='placeholder' className='sprout-images' />
          </div>
        </section>
        <section className='description top-border sprout-background'>
          <h2>Data Collection and Grouping</h2>
          <div className='info white-card'>
            <p>All data collected on a class and student level can be accessed on the Data Display.
              Sprout tracks many classroom statics, including: the number and percentage of students who complete a learning target,
              individual and class average of self-evaluation scores, individual goals set for each student, exit ticket responses,
              groups for multiple choice exit ticket responses, and much more!
          </p>

          </div>
        </section>
        <footer>

          <h2> Let Sprout Help You Grow Your Students Today! </h2>
          <Link to='/register' className='teacher'>
            Sign Up Now!
          </Link>
        </footer>
      </div>
    )
  }
}

export default LandingPage;