import React from 'react';
import StudentApiService from '../../Services/student-auth-api-service';
import TokenService from '../../Services/token-service';
import TeacherContext from '../../Contexts/TeacherContext';
import TeacherAuthService from '../../Services/teacher-auth-api-service';
import './SessionRoute.css';

class SessionRoute extends React.Component {
  static contextType = TeacherContext;

  state = {
    error: null,
    learningTarget: [],
    updatedSubGoal: '',
    updatedPriority: null,
    class_id: null,
    students: [],
  }

  componentDidMount() {
    if(!this.state.class_id){
      TeacherAuthService.getTeacherClasses()
      .then(classes => this.context.setClass(classes[0]))
      .then(() => this.setState({
        loaded: true,
        class_id: this.context.teacherClass.id
      }))
      .then(() => {
        if(TokenService.hasAuthToken()) {
          const class_id = this.context.teacherClass.id;
        this.setState({
          class_id: class_id
        })
          //get students, goals, and subgoals
          StudentApiService.getAllStudents(class_id)
          .then(res => {
            console.log('here is the response', res)
            const setupStudents = this.setupStudents(res.students);
            const learningTarget = res.goals[0] ? res.goals.pop() : ''
            this.setState({
              students: setupStudents,
              learningTarget: res.goals[0] ? learningTarget.goal_title : learningTarget
            })
          })
          .catch(error => this.setState({ error }))
        } else {
          this.props.history.push('/login/teacher');
        } 
      })
    }
    
  }

  setupStudents = (students) => {
    //students should be an array of objects
    return students.map(student => {
      student.expand = false;
      student.expired = false;
      student.order = 0;
      student.priority = 1;
      return student;
    })
  }

  // Should set timer when sub goal is updated
  handleTimer = (studentUsername, priority) => {
    // High - 5 min/300000, Medium - 10min/600000, Low - 20 min/1200000 
    // Testing - high/5 sec(5000), medium/7 sec(7000), low/10 sec(10000)
    const time = priority === 'high' ? 5000 : priority === 'medium' ? 7000 : 10000;
    setTimeout(this.handleExpire, time, studentUsername);
  }

  // Should toggle expired key to true and set order when timer expires
  // Setting the order allows the first timer that ends to remain first in line and
  // subsequent timers to follow in line after
  handleExpire = studentUsername => {
    const expiredStudent = this.state.students.find(student => student.user_name === studentUsername);
    const studentOrder = {...expiredStudent, expired: true, order: new Date()};
    this.setState({
      students: this.state.students.map(student => student.user_name !== studentUsername ? student: studentOrder)
    })
  }

  handleUpdateGoal = (e, studentUsername) => {
    e.preventDefault();
    // const data = {goal_title: this.state.updatedSubGoal};
    // StudentApiService.updateStudent(studentUsername, data)
    //   .then(res => {
    //     const studentToUpdate = this.state.students.find(student => student.user_name === studentUsername);
    //     const updatedStudent = {
    //       ...studentToUpdate,
    //       ...data,
    //       expand: false,
    //       order: 0,
    //     }
    //     this.handleTimer(updatedStudent.user_name, this.state.updatedPriority);
    //     this.setState({
    //       students: this.state.students.map(student => student.user_name !== studentUsername ? student : updatedStudent),
    //       subgoal: '',
    //       priority: 'low'
    //     });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     this.setState({ error })
    //   });
    const studentToUpdate = this.state.students.find(student => student.user_name === studentUsername)
    const updatedStudent = {...studentToUpdate, subGoal: this.state.updatedSubGoal, priority: this.state.updatedPriority, expand: false}
    this.handleTimer(studentUsername, this.state.updatedPriority);
    this.setState({
      students: this.state.students.map(student => student.user_name === studentUsername ? updatedStudent : student),
      updatedSubGoal: '',
      updatedPriority: ''
    })
  }

  // Should toggle when clicking to expand and hide extra student information
  toggleExpand = (studentUsername) => {
    const studentToExpand = this.state.students.find(student => student.user_name === studentUsername);
    const expiredCheck = studentToExpand.expired === false ? 0 : studentToExpand.order;
    const expandedStudent = {...studentToExpand, expand: !studentToExpand.expand, expired: false, order: expiredCheck};
    
    this.setState({
      students: this.state.students.map(student => student.user_name !== studentUsername ? student : expandedStudent),
      updatedSubGoal: '',
      updatedPriority: ''
    })
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
          {/* RECONFIGURE ONCE SUBGOALS CAN POST AND WE KNOW WHAT WE'RE GETTING BACK */}
          <p>{student.subGoal ? student.subGoal : this.state.learningTarget}</p>
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
                onChange={(e) => this.setState({updatedSubGoal: e.target.value})}
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
                  value='0'
                  id='high'
                  name='priority'
                  onChange={(e) => this.setState({updatedPriority: 'high'})} />
                <label
                  htmlFor='high'>High</label>
                <input
                  className='radio'
                  type='radio'
                  value='1'
                  id='medium'
                  name='priority'
                  onChange={(e) => this.setState({updatedPriority: 'medium'})} />
                <label
                  htmlFor='medium'>Medium</label>
                <input
                  className='radio'
                  type='radio'
                  value='2'
                  id='low'
                  name='priority'
                  onChange={(e) => this.setState({updatedPriority: 'low'})} />
                <label
                  htmlFor='low'>Low</label>
              </div>
              <div>
                <button 
                  className='button green-button'
                  type='submit'>Update Goal</button>
              </div>
            </form>
            {/* {student.subgoal ? <h4>Previous Goals:</h4> : ''}
            <ul>
            {student.subgoal ? student.subgoal.map((subgoal, index) => <li key={index}>subgoal</li>) : ''}
            </ul> */}
          </div>
        </li>
      )
    })
    return allStudents;
  }

  render() {
    const error = this.state.error;
    const learningTarget = this.state.learningTarget;
    const studentsToSort = this.state.students.filter(student => student.order !== 0)
    const sortedStudents = studentsToSort.sort((a, b) => a.order > b.order ? 1 : -1);
    const studentsToList = this.state.students.filter(student => student.order === 0);
    const allStudents = [...sortedStudents, ...studentsToList];
    const students = this.makeCards(allStudents);
    
    return (
      <section className='SessionRoute-container'>
        <div className='alert' role='alert'>
        {error && <p>{error.message}</p>}
        </div>
        <div>
          <h2>Learning Target: </h2>
          <p className='learning-target'>{learningTarget}</p>
        </div>
        <ul className='student-list'>
          {students}
        </ul>
      </section>
    )
  }
}

export default SessionRoute;