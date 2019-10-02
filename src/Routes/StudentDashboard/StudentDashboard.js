import React from 'react';
import StudentAuthApiService from '../../Services/student-auth-api-service';
import { Link } from 'react-router-dom';
import StudentTimer from '../../Components/Timer/StudentTimer';
import StudentContext from '../../Contexts/StudentContext';
import Loading from '../../Components/Loading/Loading';
import openSocket from 'socket.io-client';
import './StudentDashboard.css';


class StudentDashboard extends React.Component{
  static contextType = StudentContext;
  socket = openSocket('http://localhost:8000');
  
  state = {
    studentId: null,
    goals: [],
    subgoals: [],
    error: null,
    timer: false,
    show: true,
    evaluations:[],
    learningTarget: null,
    currentGoal: null,
    loaded: false,
  };

  componentDidMount() {
    console.log('student dashboard CDM')
    console.log(this.context.user.id)
    StudentAuthApiService.getStudentGoals(this.context.user.id)
      .then(res => {
        const student_goals = res.goals;
        const learningTarget = res.goals[res.goals.length-1];
        const student_subgoals = learningTarget.subgoals;
        const currentGoal = learningTarget.subgoals[learningTarget.subgoals.length -1] || learningTarget
        this.setState({
          studentId: this.context.user.id,
          goals: student_goals,
          subgoals: student_subgoals,
          learningTarget: learningTarget,
          currentGoal: currentGoal,
          loaded: true,
        })
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
      this.socket.on('new goal', this.rTNewGoal);
      this.socket.on('patch goal', this.rTPatchGoal);
      this.socket.on('new subgoal', this.rTNewSubgoal);
      this.socket.on('patch subgoal', this.rTPatchSubgoal);
  }

  handleLogoutClick = () => {
    this.context.processLogout();
  }

  renderExitTicketLink(){
    return (
      <nav>
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
    console.log(currTimer)
    return currTimer;
    
  }
  
  rTNewGoal = async (data) => {
    const { goals, studentId } = this.state;
    let { student } = await StudentAuthApiService.getStudent(studentId)
    if(data.class_id === student.class_id)
      this.setState({ goals: [...goals, data] })
  }

  rTPatchGoal = async (data) => {
    const { goals, studentId } = this.state;
    let { student } = await StudentAuthApiService.getStudent(studentId)
    if(data.class_id === student.class_id){
      let newGoals = goals.map(goal => data.id === goal.id ? goal = data : goal)
      this.setState({ goals: newGoals })
    }
  }

  rTNewSubgoal = async (data) => {
    const { subgoals, studentId } = this.state;
    let { student } = await StudentAuthApiService.getStudent(studentId)
    if(data.student_id === student.id)
      this.setState({ goals: [...subgoals, data] })
  }

  rTPatchSubgoal = async (data) => {
    const { subgoals, studentId } = this.state;
    let { student } = await StudentAuthApiService.getStudent(studentId)
    if(data.student_id === student.id){
      let newSubgoals = subgoals.map(subgoals => data.id === subgoals.id ? subgoals = data : subgoals)
      this.setState({ subgoals: newSubgoals })
    }
  }

  render() {

    let currStudent = this.context.user.username;
    let currTimer = this.findStudentWithTimer(this.props.studentTimers, currStudent);
    const {loaded, error, currentGoal, learningTarget, subgoals, timer} = this.state;
    console.log(this.state)
    console.log('loaded', loaded)

    

    //grabs the last goal in goals which should be the most current learning target
    // const learningTarget = this.state.goals[this.state.goals.length-1];
    //removes the last subgoal from subgoals
    
    // let array = [...this.state.subgoals]; 
    // const currentGoal = array.pop();
    //maps through the rest of the subgoals
    
    // const previousGoals = array.map((sub, index) => <li key={index}>{sub.subgoal_title}</li>);

    if(error){
      return <p>{error.message}</p>
    }
    if(!loaded){
      return <Loading />
    }
    return(
      <section className="student-dashboard-section" >
          <div className="links">
            {this.renderExitTicketLink()}
          </div>  
        <div className='goals-container'>
          {/* Learning Target */}
          <h2>Learning Target: </h2>
          <div className='student-goal'><p>{learningTarget.goal_title}</p></div>

          {/* current goal */}
          <h2>Current Goal:</h2>
          <div className='student-subgoal'>
          <p>{(currentGoal.subgoal_title) ? currentGoal.subgoal_title : currentGoal.goal_title}</p>          
          </div>
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
          {(subgoals.length) 
          ? <ul>{subgoals.map((goal, i) => <li key={i}>{(currentGoal.subgoal_title === goal.subgoal_title) ? <p>No previous goals</p> : goal.subgoal_title}</li>)}</ul> 
          : <p>No previous goals</p>}
        </div>
      </section>
    )
  }
}

export default StudentDashboard;