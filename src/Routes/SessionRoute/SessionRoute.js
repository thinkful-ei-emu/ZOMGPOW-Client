import React from 'react';
import StudentApiService from '../../Services/student-auth-api-service';
import TokenService from '../../Services/token-service';
import TeacherContext from '../../Contexts/TeacherContext';
import TeacherAuthService from '../../Services/teacher-auth-api-service';
import Loading from '../../Components/Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SessionRoute.css';

class SessionRoute extends React.Component {
  static contextType = TeacherContext;

  constructor(props) {
    super(props)
    this.state = {
      error: null,
      currentGoal: null,
      learningTarget: '',
      learningTargetCompleted: false,
      updatedSubGoal: '',
      updatedPriority: null,
      classId: null,
      loaded: false,
      students: [],
      newSubgoal: '',
      currentSubgoal: ''
    }
  }

componentDidMount() {
  let classId;
  if (TokenService.hasAuthToken()) {
    if (!this.state.classId) {
      TeacherAuthService.getTeacherClasses()
        .then(classes => {
          this.context.setClass(classes[0]);
          classId = this.context.teacherClass.id;
          //get students, goals, and subgoals
          return StudentApiService.getAllStudents(classId)
        })
        .then(res => {              
          this.setupStudents(res.students)
            .then(setupStudents => {
              let goals = [...res.goals]
              const learningTarget = goals[0] ? goals.pop() : {}
              this.setState({
                classId,
                loaded: true,
                students: setupStudents,
                learningTargetCompleted: learningTarget.date_completed ? true : false,
                currentGoal: learningTarget,
                learningTarget: learningTarget.goal_title ? learningTarget.goal_title : ''
              })
            })
          
        })
        .catch(error => this.setState({ error }))
      }
    }
  }

  getGoal(student_id) {
    //get student goals
    return StudentApiService.getStudentGoals(student_id)
      .then(res => {
        let goals = [...res.goals]
        // let subgoals = [...res.subgoals]
        //need the correct subgoal (newest goal, but for current learning target)
        return goals.pop();
          // subgoals: subgoals.pop()
        
      })
      .catch(error => this.setState({ error }))
  }

  setupStudents = (students) => {
    //students should be an array of objects
    return Promise.all(students.map(student => {
      return this.getGoal(student.id).then(goal => {
        student.mainGoal = goal.goal_title;
        student.mainGoalId = goal.id;
        student.studentGoalId = goal.sg_id;
        student.mainGoalDate = goal.date_created;
        //checks if there are subgoals and gets the most recent one for that specified goal   
        goal.subgoals 
        ? student.studentSubgoal = goal.subgoals[goal.subgoals.length-1].subgoal_title
        : student.studentSubgoal = '';    
        student.iscomplete = goal.iscomplete;
        student.expand = false;
        student.expired = false;
        student.order = 0;
        student.priority = 'low';     
        return student;
      })
    }))
  }

  // Should set timer when sub goal is updated
  handleTimer = (studentUsername, priority) => {
    // High - 5 min/300000, Medium - 10min/600000, Low - 20 min/1200000 
    // Testing - high/5 sec(5000), medium/7 sec(7000), low/10 sec(10000)
    const time = priority === 'high' ? 50000 : priority === 'medium' ? 70000 : 100000;
    let timerId = setTimeout(this.handleExpire, time, studentUsername);
    //setState to the timerId
   this.setState({
    timerId: timerId
   })
    this.props.handleStudentTimers(studentUsername, time)
   
  }

  componentWillUnmount (){
   //clearTimer to avoid memory leakage
    clearTimeout(this.state.timerId)
  }

 
  // Should toggle expired key to true and set order when timer expires
  // Setting the order allows the first timer that ends to remain first in line and
  // subsequent timers to follow in line after
  handleExpire = studentUsername => {
    const expiredStudent = this.state.students.find(student => student.user_name === studentUsername);
    const studentOrder = { ...expiredStudent, expired: true, order: new Date() };
    this.setState({
      students: this.state.students.map(student => student.user_name !== studentUsername ? student : studentOrder)
    })
  }

  handleUpdateGoal = (e, studentUsername) => {
    e.preventDefault();
    const priority = this.state.updatedPriority;
    const data = { subgoal_title: this.state.updatedSubGoal };
    const filterStudent = [...this.state.students]
    const student = filterStudent.filter(student => student.user_name === studentUsername).pop();
    const goalId = student.studentGoalId;

    StudentApiService.postStudentSubgoal(goalId, data)
      .then(res => {
        const studentToUpdate = this.state.students.filter(student => student.user_name === studentUsername);
        const updatedStudent = {
          ...studentToUpdate[0],
          subgoal: res.subGoal.subgoal_title,
          priority: priority,
          expand: false,
          expired: false,
          order: 0,
        }
        this.handleTimer(updatedStudent.user_name, this.state.updatedPriority);
        this.setState({
          students: this.state.students.map(student => student.user_name !== studentUsername ? student : updatedStudent),
        })
      })
      .then(() => {
        this.handleTimer(studentUsername, this.state.updatedPriority)
        this.setState({
          updatedSubGoal: '',
          updatedPriority: ''
        })
      })
      .catch(error => {
        console.error(error);
        this.setState({ error })
      });  
  }

  // Should toggle when clicking to expand and hide extra student information
  toggleExpand = (studentUsername) => {
    const studentToExpand = this.state.students.find(student => student.user_name === studentUsername);
    const expiredCheck = studentToExpand.expired === false ? 0 : studentToExpand.order;
    const expandedStudent = { ...studentToExpand, expand: !studentToExpand.expand, expired: false, order: expiredCheck };

    this.setState({
      students: this.state.students.map(student => student.user_name !== studentUsername ? student : expandedStudent),
      updatedSubGoal: '',
      updatedPriority: ''
    })
  }

  toggleTargetComplete = (id, data) => {
    StudentApiService.patchStudentGoal(id, {iscomplete: !data})
    .then(res => {
      const studentsToSort = this.state.students.map(student => student.studentGoalId === id ? {...student, iscomplete: !data} : student)
      this.setState({
        students: studentsToSort
      })
    })
  }

  handleEndSession = (e) => {
    this.context.endSession();

    //creates and formats the time the button was clicked
    let time = new Date()
    let endTime = time.toISOString()
    
    //gets the current goal and sets the date_completed to the current time
    let goal = this.state.currentGoal;
    goal.date_completed = endTime;

    //patches the goal in the db and pushes to the exit ticket route
    TeacherAuthService.endSessionGoal(goal)
      .then(() => this.props.history.push('/exitTicket'))

  }

  // Will make cards for students given
  makeCards = (students) => {
    const allStudents = students.map((student) => {
      return (
        <li
          key={student.user_name}
          className={student.expired === true ? `expired ${student.priority}` : ''}
        >
          <h3>{student.full_name}</h3>
          {student.iscomplete ? 
            <div>
              <p>Learning Target Complete!</p>
              <button 
                className='button green-button'
                onClick={() => this.toggleTargetComplete(student.studentGoalId, student.iscomplete)
                }>Undo Complete</button>
            </div> 
            : 
            <div>   
                    
            {student.expand && <button 
              className='button green-button'
              onClick={() => this.toggleTargetComplete(student.studentGoalId, student.iscomplete)
                }>Learning Target Complete</button>}

              <p>{student.studentSubgoal? student.expand? `Student Goal: ${student.studentSubgoal}`: student.studentSubgoal: this.state.learningTarget}</p>
          
            <button
              className={student.expand ? ' button blue-button' : 'button purple-button'}
              onClick={e => this.toggleExpand(student.user_name)}>{student.expand ? 'Cancel' : 'Check In'}</button>
            <div className={student.expand ? '' : 'hidden'}>
              <form onSubmit={e => this.handleUpdateGoal(e, student.user_name)}>
                <label
                  htmlFor='new-subgoal' />
                <textarea
                  id='new-subgoal'
                  type='text'
                  name='new-subgoal'
                  placeholder='New Sub-Goal'
                  onChange={(e) => this.setState({ updatedSubGoal: e.target.value })}
                  value={this.state.updatedSubGoal}
                  aria-label='create new subgoal'
                  aria-required='true'
                  required
                />
                <div>
                  <h4>Priority:</h4>
                  <input
                    className='radio'
                    type='radio'
                    value='high'
                    id='high'
                    name='priority'
                    onChange={(e) => this.setState({ updatedPriority: 'high' })} />
                  <label
                    className='radio-label'
                    htmlFor='high'><FontAwesomeIcon className='high-priority' icon={['fas', 'search']} />High</label>
                  <input
                    className='radio'
                    type='radio'
                    value='medium'
                    id='medium'
                    name='priority'
                    onChange={(e) => this.setState({ updatedPriority: 'medium' })} />
                  <label
                    className='radio-label'
                    htmlFor='medium'><FontAwesomeIcon className='medium-priority' icon={['fas', 'search']} />Medium</label>
                  <input
                    className='radio'
                    type='radio'
                    value='low'
                    id='low'
                    name='priority'
                    onChange={(e) => this.setState({ updatedPriority: 'low' })} />
                  <label
                    className='radio-label'
                    htmlFor='low'><FontAwesomeIcon className='low-priority' icon={['fas', 'search']} />Low</label>
                </div>
                <div>
                  <button
                    className='update button green-button'
                    type='submit'>Update Goal</button>
                </div>
              </form>
            </div>
          </div>
          }
        </li>
      )
    })
    return allStudents;
  }

  render() {
    const {error, loaded} = this.state;
    const learningTarget = this.state.learningTarget;
    const studentsToSort = this.state.students.filter(student => student.order !== 0)
    const sortedStudents = studentsToSort.sort((a, b) => a.order > b.order ? 1 : -1);
    const studentsToList = this.state.students.filter(student => student.order === 0);
    const allStudents = [...sortedStudents, ...studentsToList];
    const students = this.makeCards(allStudents);

    if(!loaded) {
      return <Loading />
    }

    return (
      <section className='SessionRoute-container'>
        <div className='alert' role='alert'>
          {error && <p>{error.message}</p>}
        </div>
        <div className={this.state.learningTargetCompleted ? 'hidden' : ''}>
          <div>
            <h2>Learning Target: </h2>
            <p className='learning-target'>{learningTarget}</p>
            <button 
              className={'button blue-button'}
              onClick={(e) => {this.handleEndSession(e)}}
            >End Session</button>
          </div>
          <ul className='student-list'>
            {students}
          </ul>
        </div>
        <div className={this.state.learningTargetCompleted ? '' : 'hidden'}>
        <h2>No active learning target!  Set a new one on your dashboard!</h2>
        </div>
      </section>
    )
  }
}

export default SessionRoute;