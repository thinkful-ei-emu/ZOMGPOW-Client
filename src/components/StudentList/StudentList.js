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
    class_id: null,
    isDeleting: false,
  }

  componentDidMount() {
    // Fetch students from API -- PSUEDO CODE, need to check with Back End
    let classid = this.context.teacherClass.id
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
    let newStudent = { full_name: this.state.userInput, class_id: this.state.class_id }
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
    const { error, class_id, isDeleting} = this.state;
    const fullname = this.props.students.map((student, index) => <li key={index}>{student.full_name}</li>)
    const username = this.props.students.map((student, index) => <li key={index}>{student.user_name}<span><button onClick={() => this.handleDeleteStudent(student.user_name, class_id)}>X</button></span></li>)
    
    if(isDeleting){
      return (<div>loading...</div>)
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
      <table className='studentlist'>
        <tr>
          <th>Full Name</th>
          <th>User Name</th>
        </tr>
        <tr>
          <td><ul>{fullname}</ul></td>
          <td><ul>{username}</ul></td>
        </tr>
      </table>
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

