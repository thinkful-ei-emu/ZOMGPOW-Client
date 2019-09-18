import React from 'react';
import './StudentList.css';

class StudentList extends React.Component{
  state = {
    students: [
      {
        name: 'studentA',
        username: 'studentA123'
      },
      {
        name: 'studentB',
        username: 'studentB456'
      },
      {
        name: 'studentC',
        username: 'studentC789'
      },
      ],
      userInput: null,
      newStudent: null,
  }

  componentDidMount() {
    // Fetch students from API
    
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
    // Use Student Api Service to post student
    // Re-render student list with updated name and username
  }


  render() {
    const studentList = this.state.students.map(student => <li>{student.name} {student.username}</li>)
    return(
      <div className='StudentList-container'>
      <h2>Students</h2>
        <ul>
          {studentList}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <label 
            htmlFor='add-student'>Student Name: </label>
            <input
            onChange={this.handleChange}
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