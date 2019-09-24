import React from 'react';
import StudentAuthApiService from '../../Services/student-auth-api-service';
import './StudentList.css';
import TeacherContext from '../../Contexts/TeacherContext'
import config from '../../config'
import TokenService from '../../Services/token-service'

class StudentList extends React.Component {

  static contextType = TeacherContext;

  state = {
    error: null,
    userInput: '',
    newStudent: null,
    classId: null,
    isDeleting: false,
  }

  componentDidMount() {
    // Fetch students from API -- PSUEDO CODE, need to check with Back End
    let classId = this.context.teacherClass.id
    this.setState({
      classId: classId
    })
    return fetch(`${config.API_ENDPOINT}/class/${classId}/students`, {
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
        this.props.displayStudents(resStudents)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  handleDeleteStudent = (username, classId) => {

    this.setState({isDeleting: true})

    console.log(username);
    console.log('class id', classId);

    StudentAuthApiService.deleteStudent(username, classId)
      .then(res => {
        if(!res.ok){
          this.setState({error: res.error})
        } else {
          this.props.removeStudent(username)
          this.setState({isDeleting: false})
        }
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
    let newStudent = { fullName: this.state.userInput, classId: this.state.classId }
    StudentAuthApiService.postStudent(newStudent)
      .then(res => {
        this.props.addStudents(res)
        this.setState({
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
    const { error, classId, isDeleting} = this.state;
    const fullName = this.props.students.map((student, index) => <li key={index}>{student.full_name}</li>)
    const username = this.props.students.map((student, index) => <li key={index}>{student.user_name}<span><button className='delete-student' onClick={() => this.handleDeleteStudent(student.user_name, classId)}>X</button></span></li>)

    if(isDeleting){
      return (<div>loading...</div>)
    } 
    return(
      <div className='StudentList-container'>
      <h2>Students</h2>
      <div className='alert' role='alert'>
        {error && <p>{error}</p>}
      </div>
      {fullName.length < 1 
            ? <p>Add your students!</p> 
            :
            <div className='StudentList'>
              <div className='student-name'>
                <h3>Student Name</h3>
                <ul>
                  {fullname}
                </ul>
              </div>
              <div className='student-username'>
                <h3>Username</h3>
                <ul>
                  {username}
                </ul>
              </div>
            </div>
      }      
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
            placeholder='eg. John Smith'
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

