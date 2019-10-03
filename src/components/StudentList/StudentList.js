import React from 'react';
import StudentAuthApiService from '../../Services/student-auth-api-service';
import './StudentList.css';
import TeacherContext from '../../Contexts/TeacherContext'
import config from '../../config'
import TokenService from '../../Services/token-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../../Components/Loading/Loading';

class StudentList extends React.Component {

  static contextType = TeacherContext;

  state = {
    error: null,
    userInput: '',
    newStudent: null,
    classId: null,
    isDeleting: false,
    loaded: false,
  }

  componentDidMount() {
    // Fetch students from API
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
        this.setState({ loaded: true })
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  handleDeleteStudent = (username, classId) => {
    this.setState({isDeleting: true})
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
    console.log(e.target.value)
    this.setState({
      userInput: e.target.value,
    })
  }

  handleSubmit = (e) => { 
    e.preventDefault();
    this.setState({
      newStudent: this.state.userInput,
    })
    // Use Student Api Service to post student
    let newStudent = { full_name: this.state.userInput, class_id: this.state.classId }
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
          
        })
      })
  }

  render() {
    const { error, classId, loaded} = this.state;
    const fullname = this.props.students.map((student, index) => <li key={index}>{student.full_name}</li>)
    const username = this.props.students.map((student, index) => <li key={index}>{student.user_name}<span><button className='delete-student' onClick={() => this.handleDeleteStudent(student.user_name, classId)}> <FontAwesomeIcon icon={['far', 'trash-alt']} /></button></span></li>)
    
    if(!loaded){
      return (<Loading />)
    } 
    return(
      <div className='StudentList-container'>
      <h2>Students</h2>
      <div className='alert' role='alert'>
        {error && <p>{error}</p>}
      </div>
      {fullname.length < 1 
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
            <button type='submit' className='button green-button'>Add Student</button>
          </div>
        </form>
      </div>
    )
  }
}

export default StudentList;

