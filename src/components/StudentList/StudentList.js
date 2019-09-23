import React from './node_modules/react';
import StudentAuthApiService from '../../Services/student-auth-api-service';
import './StudentList.css';
import TeacherContext from '../../Contexts/TeacherContext'
import config from '../../config'
import TokenService from '../../Services/token-service'

class StudentList extends React.Component{

  static contextType = TeacherContext;

  state = {
    error: null,
    students: [],
      userInput: '',
      newStudent: null,
      class_id: this.context.teacherClass.teacherClass.id
  }

  componentDidMount() { 
    // Fetch students from API -- PSUEDO CODE, need to check with Back End
    let classid = this.context.teacherClass.teacherClass.id
    this.setState({
      class_id: classid
    })
    return fetch(`${config.API_ENDPOINT}/class/${classid}/students`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
      .then(resStudents => {       
        this.setState({
          students: resStudents.students,
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      newStudent: this.state.userInput,
    })
    // Use Student Api Service to post student - PSUEDO CODE
    let newStudent = {full_name: this.state.userInput, class_id: this.state.class_id}
    StudentAuthApiService.postStudent(newStudent)
      .then(res => {
        this.setState({
          students: [...this.state.students, res],
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
    const studentList = this.state.students.map((student, index) => <li key={index}><span>{student.full_name}</span><span>{student.user_name}</span></li>)
    return(
      <div className='StudentList-container'>
      <h2>Students</h2>
      <div className='alert' role='alert'>
        {error && <p>{error}</p>}
      </div>
          {studentList.length < 1 
            ? <p>Add your students!</p> 
            : <ul>{studentList}</ul>}
        <form 
          onSubmit={this.handleSubmit}
          className='add-student-form'>
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
            <button type='submit' className='button blue-button'>Add Student</button>
          </div>
        </form>
      </div>
    )
  }
}

export default StudentList;

