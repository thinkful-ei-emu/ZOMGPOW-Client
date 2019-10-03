import React from 'react';
import StudentApiService from '../../Services/student-auth-api-service';
import StudentContext from '../../Contexts/StudentContext';
import Loading from '../../Components/Loading/Loading';
import { Link } from 'react-router-dom';


class ExitTicketStudentRoute extends React.Component {
  state = {
    error: null,
    exitTicketQuestion: null,
    exitTicketOptions: null, 
    exitTicketType: null,
    studentResponse: '',
    motivationalMessage: false,
    studentGoal: null,
    studentId: null,
    studentGoalId: null,
    loaded: false,
  }

  static contextType = StudentContext;

  componentDidMount() {
    this.setState({
      studentId: this.context.user.id
    })
    
    StudentApiService.getStudentGoals(this.context.user.id)
      .then(res => {      
        let studentGoals = [...res.goals]       
        const studentGoal = studentGoals.pop();  
        this.setState({
          exitTicketQuestion: studentGoal.exit_ticket_question,
          exitTicketOptions: studentGoal.exit_ticket_options,
          exitTicketType: studentGoal.exit_ticket_type,
          studentGoalId: studentGoal.sg_id,
          classId: studentGoal.class_id,
          loaded: true,
        })
      })
      .then(() => {
        StudentApiService.getStudentGoalbyStuId(this.state.studentId, this.state.studentGoalId)
        .then(res => {    
        if (res.studentGoal.student_response) {
          this.setState({
            motivationalMessage: true
          })
        }
        
        })
        .catch(res => {
          this.setState({ error: res.error })
        })
      })
      .catch(res => {
        this.setState({ error: res.error })
      })

      
  }

  updateStudentResponse = (e) => {
    this.setState({
      studentResponse: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.studentResponse)
    if (this.state.studentResponse === '') {
      return this.setState({ error: 'Oops! We need your answer first!'})
    } else {
        //post student answer to db
        let data = {
          student_response: this.state.studentResponse
        }
        console.log('ID', this.state.studentGoalId, 'DATA', data)
        StudentApiService.patchStudentResponse(this.state.studentGoalId, data)
        .then(() => {})
        .catch(error => this.setState({ error: error.message}))      

      //toggle to motivational message
      this.setState({
        motivationalMessage: true,
      })
    }
  }

  randomMotivationalMessage = () => {
    let messages = [
      'Wow!  You just trained your brain!',
      'Way to think it through!',
      'Yes!  Challenges make your brain stronger!',
      'Perseverance is power!',
      `You're on the right track!`,
      'Wooho!  Stretch your brain!'
    ]

    return messages[Math.floor(Math.random() * messages.length)]
  }

  renderAnswer = () => {
    if (this.state.exitTicketType === 'multiple choice'){
      return (
      <div>
        <div>
        <input 
          name='radio'
          type='radio'
          id='option-A'
          value='A'
          onChange={(e) => this.updateStudentResponse(e)}
        />
        <label 
          htmlFor='option-A'
        >A. {this.state.exitTicketOptions[0]} </label>
        </div>
        <div>
        <input 
          name='radio'
          type='radio'
          id='option-B'
          value='B'
          onChange={(e) => this.updateStudentResponse(e)}
        />
        <label 
          htmlFor='option-B'
        >B. {this.state.exitTicketOptions[1]} </label>
        </div>
        <div>
        <input 
          name='radio'
          type='radio'
          id='option-C'
          value='C'
          onChange={(e) => this.updateStudentResponse(e)}
        />
        <label 
          htmlFor='option-C'
        >C. {this.state.exitTicketOptions[2]} </label>
        </div>
        <div>
        <input 
          name='radio'
          type='radio'
          id='option-D'
          value='D'
          onChange={(e) => this.updateStudentResponse(e)}
        />
        <label 
          htmlFor='option-D'
        >D. {this.state.exitTicketOptions[3]} </label>
        </div>
      </div>)
    } else {
      return (<textarea onChange={(e) => this.updateStudentResponse(e)} value={this.state.studentResponse}/>)
    }
  }

  render() {
    let answer = this.renderAnswer();
    let motivationalMessage = this.randomMotivationalMessage();
    const {loaded} = this.state;

    if (!loaded){
      return (<Loading />)
    }
    return(
      <section>
        <div className={this.state.motivationalMessage ? 'hidden' : ''}>
          <h2>Exit Ticket</h2>
          <h3>{this.state.exitTicketQuestion}</h3>
          <form
          onSubmit={(e) => this.handleSubmit(e)}>
            <div>
              {answer}
            </div>
            {this.state.error && <p className='alert'>{this.state.error}</p>}
            <button 
              type='submit' 
              className='button purple-button'  
            >I'm done!</button>
          </form>
        </div>
        <div className={this.state.motivationalMessage ? '' : 'hidden'}>
          <h2>{motivationalMessage}</h2>
          <Link to='/dashboard/student' className='button green-button'>Dashboard</Link>
        </div>
      </section>
    )
  }
}

export default ExitTicketStudentRoute;