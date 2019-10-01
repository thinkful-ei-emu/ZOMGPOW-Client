import React from 'react';
import StudentAuthApiService from '../../Services/student-auth-api-service';
import './StudentResponseDisplay.css';
import TeacherContext from '../../Contexts/TeacherContext'
import config from '../../config'
import TokenService from '../../Services/token-service'
import openSocket from 'socket.io-client';

class StudentResponseDisplay extends React.Component {

  static contextType = TeacherContext;
  // socket = openSocket('http://localhost:8000');

  state = {
    error: null,
    userInput: '',
    newStudent: null,
    classId: null,
    loaded: false
  }

  componentDidMount() {
    // Fetch students from API
    let classId = this.context.teacherClass.id
    this.setState({
      classId: classId
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
    this.socket.on('patch student goal', this.rTPatchStudentGoal);
  }

  // Updates state with every user input change
  handleChange = (e) => {
    this.setState({
      userInput: e.target.value,
    })
  }

  render() {
    const { error, classId, loaded } = this.state;
    const fullname = this.props.students.map((student, index) => <li key={index}>{student.full_name}</li>)
    const response = this.props.students.map((student, index) => <li key={index}>{student.response ? student.response : 'awaiting response'}</li>)
    
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

