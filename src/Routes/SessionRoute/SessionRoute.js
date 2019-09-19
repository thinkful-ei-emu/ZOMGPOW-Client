import React from 'react';
import './SessionRoute.css';

class SessionRoute extends React.Component {
  state = {
    learningTarget: 'Write a 5 paragraph essay',
    updatedSubGoal: '',
    updatedPriority: null,
    students: [
      {
        fullname: 'John Smith',
        username: 'JohnS',
        goal: 'Write a 5 paragraph essay',
        goalComplete: false,
        subGoal: null,
        expand: false,
        alert: false,
        order: 0,
        priority: 1,
      },
      {
        fullname: 'Marry Ann',
        username: 'MarryA',
        goal: 'Write a 5 paragraph essay',
        goalComplete: false,
        subGoal: ['Write a thesis statement'],
        expand: false,
        alert: false,
        order: 1,
        priority: 1,
      },
      {
        fullname: 'Bob King',
        username: 'BobK',
        goal: 'Write a 5 paragraph essay',
        goalComplete: false,
        subGoal: ['Make a brainmap', 'Choose 3 ideas from brainmap', 'Write thesis sentence'],
        expand: false,
        alert: false,
        order: 0,
        priority: 1,
      },
      ]
  }

  componentDidMount() {
    // Fetch learning target and students
  }

  setupStudents = (students) => {
    //students should be an array of objects
    const addKeysStudents = students.map(student => {
      student.expand = false;
      student.alert = false;
      student.order = 0;
      student.priority = 1;
      return student;
    })
  }

  // Should set timer when sub goal is updated
  handleTimer = (studentUsername, priority) => {
    // High - 5 min/300000, Medium - 10min/600000, Low - 20 min/1200000 
    // Testing - high/5 sec(5000), medium/7 sec(7000), low/10 sec(10000)
    const time = priority === 3 ? 5000 : priority === 2 ? 7000 : 10000;
    setTimeout(this.handleAlert, time, studentUsername);
  }

  // Should toggle alert key to true and set order when timer expires
  // Setting the order allows the first timer that ends to remain first in line and
  // subsequent timers to follow in line after
  handleAlert = studentUsername => {
    const alertStudent = this.state.students.find(student => student.username === studentUsername);
    const studentOrder = {...alertStudent, alert: true, order: new Date()};
    this.setState({
      students: this.state.students.map(student => student.username !== studentUsername ? student: studentOrder)
    })
  }

  // Should toggle when clicking to expand and hide extra student information
  toggleExpand = (studentUsername) => {
    const studentToExpand = this.state.students.find(student => student.username === studentUsername);
    const alertCheck = studentToExpand.alert === false ? 0 : studentToExpand.order;
    const expandedStudent = {...studentToExpand, expand: !studentToExpand.expand, alert: false, order: alertCheck};
    this.setState({
      students: this.state.students.map(student => student.username !== studentUsername ? student : expandedStudent)
    })
  }

  // Will sort cards given
  sortCards = (studentCards) => {
    return studentCards.sort((a, b) => a.order > b.order ? 1 : -1);
  }

  // Will make cards for students given
  makeCards = (students) => {

    return students.map((student, index) => {
      return (
        <li 
          key={student.username}
          className={student.alert === true ? `alert ${student.priority}` : ''}
          onClick={e => this.toggleExpand(student.username)}
          >
          <h3>{student.fullname}</h3>
          <p>{student.subgoal ? student.subgoal[0] : student.goal}</p>
          <div className='hidden'>
            <form>
              <label
              htmlFor='new-subgoal' />
              <input
                id='new-subgoal'
                type='text'
                fullname='new-subgoal'
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
                  type='radio'
                  value='0'
                  id='high'
                  fullname='priority'
                  onChange={(e) => this.setState({updatedPriority: 0})} />
                <label
                  htmlFor='high'>High</label>
                <input
                  type='radio'
                  value='1'
                  id='medium'
                  fullname='priority'
                  onChange={(e) => this.setState({updatedPriority: 1})} />
                <label
                  htmlFor='medium'>Medium</label>
                <input
                  type='radio'
                  value='2'
                  id='low'
                  fullname='priority'
                  onChange={(e) => this.setState({updatedPriority: 2})} />
                <label
                  htmlFor='low'>Low</label>
              </div>
              <div>
                <button type='submit'>Update Goal</button>
              </div>
            </form>
            {student.subgoal ? <h4>Previous Goals:</h4> : ''}
            <ul>
            {student.subgoal ? student.subgoal.map((subgoal, index) => <li key={index}>subgoal</li>) : ''}
            </ul>
          </div>
        </li>
      )
    })
  }

  render() {
    const learningTarget = this.state.learningTarget;
    const studentsToSort = this.state.students.filter(student => student.order !== 0)
    const sortedStudents = this.sortCards(studentsToSort);
    const studentsToList = this.state.students.filter(student => student.order === 0)
    const allStudents = [...sortedStudents, ...studentsToList]
    const students = this.makeCards(allStudents)
    return (
      <section className='SessionRoute-container'>
        <div>
          <h2>Learning Target: </h2>
          <p>{learningTarget}</p>
        </div>
        <ul>
          {students}
        </ul>
      </section>
    )
  }
}

export default SessionRoute;