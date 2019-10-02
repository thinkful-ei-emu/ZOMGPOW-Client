import React from 'react';
import './StudentResponseDisplay.css';
import TeacherContext from '../../Contexts/TeacherContext'
import config from '../../config'
import TokenService from '../../Services/token-service'
import openSocket from 'socket.io-client';

class StudentResponseDisplay extends React.Component {

  static contextType = TeacherContext;
  socket = openSocket('http://localhost:8000');

  state = {
    error: null,
    userInput: '',
    newStudent: null,
    classId: null,
    loaded: false,
    students: []
  }

  componentDidMount() {
    // Fetch students from API
    let classId = this.context.teacherClass.id
    this.setState({
      classId: classId,
      students: [...this.props.students]
    })
    fetch(`${config.API_ENDPOINT}/class/${classId}/students`, {
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
    this.socket.on('patch student goal', this.ticketResponse);
  }

  ticketResponse = async (data) => {
    const { students } = this.state;
    console.log('DATA:', data)
    let updateStudents = students.map(student => data.student_id === student.id ? student = data : student)
    this.setState({ students: updateStudents })
  }

  // Updates state with every user input change
  handleChange = (e) => {
    this.setState({
      userInput: e.target.value,
    })
  }

  render() {
    const { error, classId, loaded, students } = this.state;
    let studentList;
    students.length ? studentList = students : studentList = this.props.students
    const fullname = studentList.map((student, index) => <li key={index}>{student.full_name}</li>)
    const response = studentList.map((student, index) => <li key={index}>{student.response ? student.response : 'awaiting response'}</li>)
    
    if(!loaded){
      return (<div>loading...</div>)
    } 
    return(
      <div className='StudentResponseDisplay-container'>
      <h2>Students</h2>
      <div className='alert' role='alert'>
        {error && <p>{error}</p>}
      </div>
      {fullname.length < 1 
            ? <p>Add your students!</p> 
            :
            <div className='StudentResponseDisplay'>
              <div className='student-name'>
                <h3>Student Name</h3>
                <ul>
                  {fullname}
                </ul>
              </div>
              <div className='student-response'>
                <h3>Response</h3>
                <ul>
                  {response}
                </ul>
              </div>
            </div>
      }
      </div>
    )
  }
}

export default StudentResponseDisplay;

