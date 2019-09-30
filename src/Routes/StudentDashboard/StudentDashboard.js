import React from 'react';
import StudentAuthApiService from '../../Services/student-auth-api-service';
import { Link } from 'react-router-dom';
import StudentTimer from '../../Components/Timer/StudentTimer';
import StudentContext from '../../Contexts/StudentContext';
import './StudentDashboard.css';

class StudentDashboard extends React.Component{
  static contextType = StudentContext;
  constructor(props) {
    super(props);
    this.state = {
      studentId: null,
      goals: [],
      subgoals: [],
      error: null,
      timer: false,
      show: false,
      evaluations:[],
      learningTarget: null,
      currentGoal: null,
      };
  }

  componentDidMount() {
    // this.setState({
    //   studentId: this.context.user.id,
    // })
    StudentAuthApiService.getStudentGoals(this.context.user.id)
      .then(res => {
        const student_goals = res.goals;
        const student_subgoals = res.subgoals;
        const learningTarget = res.goals[res.goals.length-1];
        const currentGoal = res.subgoals[res.subgoals.length-1];
        this.setState({
          goals: student_goals,
          subgoals: student_subgoals,
          learningTarget: learningTarget,
          currentGoal: currentGoal
        })
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  handleLogoutClick = () => {
    this.context.processLogout();
  }

  renderStudentLogout(){
    return (
      <nav>
        <Link 
          onClick={this.handleLogoutClick}
          to='/'
          className='green-button button'>
          Logout
        </Link>
        <Link
        to='/student/exitTicket'
        className='button blue-button'
        >Exit Ticket</Link>
      </nav>
    )
  }

   toggleTimer = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      show: !this.state.show,
    })
  }

  findStudentWithTimer = (studentTimers, currStudent) => {
    //currStudent is student username
   
    let currTimer = studentTimers.find(timer => timer.student === currStudent)
    
    return currTimer;
    
  }
  
  render() {

    let currStudent = this.context.user.username;
    let currTimer = this.findStudentWithTimer(this.props.studentTimers, currStudent);
   
    //grabs the last goal in goals which should be the most current learning target
    const learningTarget = this.state.goals[this.state.goals.length-1];
    //removes the last subgoal from subgoals
    
    let array = [...this.state.subgoals]; 
    const currentGoal = array.pop();
    //maps through the rest of the subgoals
    
    const previousGoals = array.map((sub, index) => <li key={index}>{sub.subgoal_title}</li>);
    
    return(
      <section className="student-dashboard-section" >
          <div className="links">
            {this.renderStudentLogout()}
          </div>  
        <div className='goals-container'>
          {/* Learning Target */}
          <h2>Learning Target: </h2>
          {learningTarget === undefined 
          ? <p>Loading..</p>
          : <div className='student-goal'><p>{learningTarget.goal_title}</p></div>}

          {/* current goal */}
          <h2>Current Goal:</h2> 
          {currentGoal === undefined
          ? <> </>
          :
          <div className='student-subgoal'>
          <p>{currentGoal.subgoal_title}</p>          
          </div>}
        </div>

        <div className='timer-container'>
        
          <button 
          className='button blue-button'
          
          onClick={this.toggleTimer}
         
          >{this.state.show ? 'Hide' : 'Timer'}</button>
          <div className={this.state.show ? '' : 'hidden'}>
            <StudentTimer currTimer={currTimer}/>
            
          </div>
        </div>
        <div>
        <Link to={{
          pathname: '/selfEvaluate', 
          state: {
            currentGoal: this.state.currentGoal,
            learningTarget: this.state.learningTarget
          }
          }}>Ready to self-evaluate?</Link> 
        </div>
        <div>
          <h3>Previous Goals</h3>
          {(previousGoals.length > 1) 
          ? <div>
          <ul>{previousGoals}</ul>
          </div>
          : <></>}
        </div>
      </section>
    )
  }
}

export default StudentDashboard;