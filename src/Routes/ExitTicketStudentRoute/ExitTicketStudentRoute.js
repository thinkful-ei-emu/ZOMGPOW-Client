import React from 'react';
import StudentApiService from '../../Services/student-auth-api-service';
import StudentContext from '../../Contexts/StudentContext';

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
  }

  static contextType = StudentContext;

  componentDidMount() {
    this.setState({
      studentId: this.context.user.id
    })
    StudentApiService.getStudentGoals(this.context.user.id)
      .then(res => {
        const studentGoal = res.goals.pop();
        console.log(studentGoal)
        // this.setState({
        //   goals: student_goals,
        // })
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
      console.log('YEP')
      return this.setState({ error: 'Oops! We need your answer first!'})
    } else {
      // console.log('PROPS', this.props, 'CONTEXT', this.context)
      //get current LT id
      StudentApiService.getStudentGoals(this.context.user.id)
      .then(res => {
        this.setState({
          studentGoal: res.goals.pop()
        })
      })
      .then(() => {
        //post student answer to db
        let data = {
          student_answer: this.state.studentResponse
        }
        StudentApiService.patchStudentResponse(this.state.studentGoal.id, data)
        .then(res => {
          console.log(res)
        })
        .catch(error => this.setState({ error: error.message}))
      })
      .catch(error => this.setState({ error: error.message }))
      

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
    if (this.state.exitTicketType === 'multipleChoice'){
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
        >A. {this.state.exitTicketOptions[1]} </label>
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
        >A. {this.state.exitTicketOptions[2]} </label>
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
        >A. {this.state.exitTicketOptions[3]} </label>
        </div>
      </div>)
    } else {
      return (<textarea onChange={(e) => this.updateStudentResponse(e)} value={this.state.studentResponse}/>)
    }
  }

  render() {
    let answer = this.renderAnswer();
    let motivationalMessage = this.randomMotivationalMessage();
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
        </div>
      </section>
    )
  }
}

export default ExitTicketStudentRoute;