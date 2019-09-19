import React from 'react';
import StudentAuthApiService from '../../Services/student-auth-api-service';
import './StudentList.css';

class StudentList extends React.Component{
  state = {
    error: null,
    students: [
      {
        name: 'studentA',
        username: 'studentA123',
        goal: 'Write a 5 paragraph essay',
        goalComplete: false,
        subGoal: null,
      },
      {
        name: 'studentB',
        username: 'studentB456',
        goal: 'Write a 5 paragraph essay',
        goalComplete: false,
        subGoal: 'Write a thesis statement'
      },
      {
        name: 'studentC',
        username: 'studentC789',
        goal: 'Write a 5 paragraph essay',
        goalComplete: false,
        subGoal: 'Make a brainmap'
      },
      ],
      userInput: '',
      newStudent: null,
  }

  componentDidMount() {
    // Fetch students from API -- PSUEDO CODE, need to check with Back End
    StudentAuthApiService.getAllStudents()
      .then(res => {
        this.setState({
          students: res.students,
        })
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  // Updates state with every user input change
  handleChange = (e) => {
    this.setState({
      userInput: e.target.value,
    })
  }

  // Updates state with user input submission
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      newStudent: this.state.userInput,
    })
    // Use Student Api Service to post student - PSUEDO CODE
    StudentAuthApiService.postStudent(this.state.newStudent)
      .then(res => {
        this.setState({
          students: [...this.state.students, res.student],
          newStudent: null,
          userInput: '',
        })
      })
      .catch(res => {
        this.setState({
          error: res.error,
          newStudent: null,
          userInput: '',
        })
      })
    
  }


  render() {
    const { error } = this.state;
    const studentList = this.state.students.map((student, index) => <li key={index}>{student.name} {student.username}</li>)
    return(
      <div className='StudentList-container'>
      <h2>Students</h2>
      <div className='alert' role='alert'>
        {error && <p>{error}</p>}
      </div>
          {studentList.length < 1 
            ? <p>Add your students!</p> 
            : <ul>{studentList}</ul>}
        <form onSubmit={this.handleSubmit}>
          <label 
            htmlFor='add-student'>Student Name: </label>
            <input
            onChange={this.handleChange}
            value={this.state.userInput}
            id='add-student'
            name='add-student'
            aria-label='Add student to list'
            aria-required='true'
            required
            />
          <div>
            <button type='submit'>Add Student</button>
          </div>
        </form>
      </div>
    )
  }
}

export default StudentList;