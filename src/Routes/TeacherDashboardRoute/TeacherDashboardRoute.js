import React from 'react';
import { Link } from 'react-router-dom';
import LearningTargetForm from '../../Components/LearningTargetForm/LearningTargetForm';
import StudentList from '../../Components/StudentList/StudentList';
import './TeacherDashboardRoute.css';
import TeacherContext from '../../Contexts/TeacherContext';
import TeacherAuthApiService from '../../Services/teacher-auth-api-service';
import TokenService from '../../Services/token-service';
import ExitTicketForm from '../../Components/ExitTicketForm/ExitTicketForm';
import config from '../../config';


class TeacherDashboardRoute extends React.Component{

  state = {
    error: null,
    classId: null,
    students: [],
    loaded: false,
    show: false, //shows exit ticket form (modal) if true
    exitTicketData: {},
    learningTarget: '',
    exitTicketQuestion: '',
    multipleChoiceA: '',
    multipleChoiceB: '',
    multipleChoiceC: '',
    multipleChoiceD: '',
    multipleChoiceCorrect: '',
  }
  
  static contextType = TeacherContext;

  componentDidMount = () => {
    let classId = this.state.classId;
    if(TokenService.getAuthToken() && !classId){


    TeacherAuthApiService.getTeacherClasses()
      .then(classes => this.context.setClass(classes[0]))
      .then(() => this.setState({
        loaded: true,
        classId: this.context.teacherClass.id
      })
      )
    } else {
      const classId = this.context.teacherClass.id;
      this.setState({
        loaded: true,
        classId
      })
    }
  }

  displayStudents = (resStudents) => {
    this.setState({
      students: resStudents.students,
    })
  }

  addStudents = (res) => {
    this.setState({
      students: [...this.state.students, res],      
    })
  }

  removeStudent = (user_name) => {
    let students = this.state.students
    let newStudents = students.filter(student => student.user_name !== user_name)
    this.setState({
      students: newStudents,
    })
  }

  //toggles state to show exit ticket form (modal) if true
  toggleModal = () => {
    this.setState({
      show: !this.state.show,
    })
  }

  updateExitTicket = (data) => {
    this.setState({
      exitTicketData: data,
    })
  }

  // LEARNING TARGET FORM
  // Updates state with every user input change
  handleChange = (e) => {
    this.setState({
      learningTarget: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      goal_title: this.state.learningTarget,
      ...this.state.exitTicketData,
    }
    fetch(`${config.API_ENDPOINT}/goals/class/${this.state.classId}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then((res) => {
      if(!res){
        return res.json().then(e => Promise.reject(e));
      }
      return res.json();
    }).then(res => {
      this.setState({
        learningTarget: ''
      })
      const { history } = this.props
      history.push('/session')
    })
    .catch(error => {
      console.error({ error })
    })
  }

  // EXIT TICKET FORM
  updateCorrectOption = (e) => {
    this.setState({
      multipleChoiceCorrect: e.target.value,
    })
  }
  updateMultipleChoiceSubmit = (e) => {
    if (e.target.id === 'option-A') {
      this.setState({
        multipleChoiceA: e.target.value,
      })
    }
    if (e.target.id === 'option-B') {
      this.setState({
        multipleChoiceB: e.target.value,
      })
    }
    if (e.target.id === 'option-C') {
      this.setState({
        multipleChoiceC: e.target.value,
      })
    }
    if (e.target.id === 'option-D') {
      this.setState({
        multipleChoiceD: e.target.value,
      })
    }
  }

  updateQuestion = (e) => {
    this.setState({
      exitTicketQuestion: e.target.value,
    })
  }

  submitExitTicket = async (e, type) => {
    e.preventDefault();
    this.setState({ error: null})
    // prepare exit ticket data
    let data = {};
    
      if (type === 'multipleChoice') {
        if (this.state.multipleChoiceCorrect !== '') {
          data = {
            exit_ticket_type: 'multiple choice',
            exit_ticket_question: this.state.exitTicketQuestion,
            exit_ticket_options: [
              this.state.multipleChoiceA, 
              this.state.multipleChoiceB, 
              this.state.multipleChoiceC, 
              this.state.multipleChoiceD
            ],
            exit_ticket_correct_answer: this.state.multipleChoiceCorrect,
          }
        } else {
          this.setState({
            error: 'Choose a correct answer option'
          })
          return;
        }
      }
      if (type === 'shortAnswer') {
        data = {
          exit_ticket_type: 'short answer',
          exit_ticket_question: this.state.exitTicketQuestion,
        }
      }
      
      // GIVE TO LT FORM to post to server in relation to LT ID
      await this.updateExitTicket(data);
      // reset form and state
      this.setState({
        exitTicketQuestion: '',
        multipleChoiceA: '',
        multipleChoiceB: '',
        multipleChoiceC: '',
        multipleChoiceD: '',
        multipleChoiceCorrect: '',
        error: null,
      })
      this.handleSubmit(e);    
  }

  updateCorrectAnswer = (e, answer) => {
    this.setState({ multipleChoiceCorrect: answer })
  }

  

  render() {
    const {loaded, students} = this.state;
    if(!loaded){
      return <div><p>loading...</p></div>
    } else {
      return (
        <section className='TeacherDashboardRoute-section'>
        
        <div className='data'>
          <Link to={'/data'} className='button blue-button'>Data display</Link>
          </div>
        {students.length > 0 ? <div className='TeacherDashboardRoute-learning-target-submit'>
            <LearningTargetForm 
              history={this.props.history} 
              classId={this.state.classId} 
              showModal={this.toggleModal}
              handleChange={this.handleChange}
              learningTarget={this.state.learningTarget}
              />
          </div>: <></>}

          <ExitTicketForm 
            show={this.state.show} 
            onClose={this.toggleModal}
            handleSubmit={this.handleSubmit}
            updateCorrectOption={this.updateCorrectOption}
            updateMultipleChoiceSubmit={this.updateMultipleChoiceSubmit}
            updateQuestion={this.updateQuestion}
            submitExitTicket={this.submitExitTicket}
            updateCorrectAnswer={this.updateCorrectAnswer} />

          <div className='TeacherDashboardRoute-student-list'>
            <StudentList 
              addStudents= {this.addStudents} 
              removeStudent={this.removeStudent} 
              displayStudents= {this.displayStudents} 
              classId={this.state.classId} 
              students={this.state.students}/>
          </div>
        </section>
      );
    } 
  }
}

export default TeacherDashboardRoute;