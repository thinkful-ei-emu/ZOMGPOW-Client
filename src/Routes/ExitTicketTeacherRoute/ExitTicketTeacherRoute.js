import React from 'react';
import config from '../../config';
import TokenService from '../../Services/token-service';
import TeacherAuthApiService from '../../Services/teacher-auth-api-service';
import TeacherContext from '../../Contexts/TeacherContext';

class ExitTicketTeacherRoute extends React.Component {

  state = {
    error: null,
    exitTicketQuestion: null, 
    exitTicketOptions: null, 
    exitTicketCorrectAnswer: null, 
    studentAnswers: [], 
    classId: null,
  }

  static contextType = TeacherContext;

  componentWillMount() {
    let token;
    let classId = this.state.classId;
    if(TokenService.getAuthToken() && !classId){
      token = TokenService.parseAuthToken()

    TeacherAuthApiService.getTeacherClasses()
      .then(classes => this.context.setClass(classes[0]))
      .then(() => this.setState({
        loaded: true,
        classId: this.context.teacherClass.id
      }))
      .then(() => {
        return fetch(`${config.API_ENDPOINT}/goals/class/${this.state.classId}`, {
          method: 'GET',
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
          console.log('RES', res)
          let goal = res.goals.pop();
          this.setState({
            exitTicketQuestion: goal.exit_ticket_question,
            exitTicketOptions: goal.exit_ticket_options,
            exitTicketCorrectAnswer: goal.exit_ticket_correct_answer,
          })
        })
        .catch(error => {
          console.error({ error })
        })
      })

    } else {
      const classId = this.context.teacherClass.id;
      this.setState({
        loaded: true,
        classId
      })
    }
}


  render() {
    let options = this.state.exitTicketOptions ?
      this.state.exitTicketOptions.map((option, index) => <li key={index}>{option}</li>)
      : ''
    return (
      <div>
        <h2>{this.state.exitTicketQuestion ? 'Exit Ticket Prompt:' : `You didn't create an exit ticket this time!`}</h2>
        <h3>{this.state.exitTicketQuestion? this.state.exitTicketQuestion : ''}</h3>
        <ul>{options}</ul>
        <h3>{this.state.exitTicketCorrectAnswer ? `Correct Answer: ${this.state.exitTicketCorrectAnswer}` : ''}</h3>
        {/* <div className='student-answers'>
          <h2>Student Responses</h2>
        </div> */}
        {/* Link to dashboard or data view? */}
      </div>
    )
  }
}

export default ExitTicketTeacherRoute;