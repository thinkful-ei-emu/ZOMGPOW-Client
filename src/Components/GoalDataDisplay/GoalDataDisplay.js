import React from 'react';
import TeacherContext from '../../Contexts/TeacherContext';
import TokenService from '../../Services/token-service';
import TeacherAuthApiService from '../../Services/teacher-auth-api-service';
import Loading from '../../Components/Loading/Loading';
import { Link } from 'react-router-dom';
import config from '../../config';


class GoalDataDisplay extends React.Component {


  state = {
    goalData: [],
    exitTicketInfo: [],
    goalId: this.props.match.params.goalId,
    classId: null,
    loaded: false,
    exitTicketHidden: false,
  }

  static contextType = TeacherContext;



  componentDidMount() {


    if (TokenService.getAuthToken() && !this.state.classId) {
      TeacherAuthApiService.getTeacherClasses()
        .then(classes => this.context.setClass(classes[0]))
        .then(() => this.setState({
          loaded: true,
          classId: this.context.teacherClass.id
        }, () => {
          return fetch(`${config.API_ENDPOINT}/data/${this.state.classId}/${this.state.goalId}`, {
            method: 'GET',
            headers: {
              'authorization': `Bearer ${TokenService.getAuthToken()}`
            }
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
            .then(resData => this.setState({
              loaded: true,
              goalData: resData.studentResponses,
              exitTicketInfo: resData.exitTicketInfo
            }))
        }))

    }
  }

  handleShortAnswerResponses = studentArr => {
    return studentArr.map((student, i) => {
      return <p key={i} className='student-answer-response'><strong>{student.full_name}: </strong>{student.response}</p>
    })
  }

  toggleExitTicketHidden = () => {
    this.setState({
      exitTicketHidden: !this.state.exitTicketHidden
    })
  }

  makeStudentResponseRows = (studentResponses, correct) => {
    let arrA = [];
    let arrB = [];
    let arrC = [];
    let arrD = [];
    console.log('student responses', studentResponses)
    for (let i = 0; i < studentResponses.length; i++) {
      console.log(studentResponses[i].response)
      if (studentResponses[i].response === 'A') {
        arrA.push(studentResponses[i].full_name)
      }
      else if (studentResponses[i].response === 'B') {
        arrB.push(studentResponses[i].full_name)
      }
      else if (studentResponses[i].response === 'C') {
        arrC.push(studentResponses[i].full_name)
      }
      else if (studentResponses[i].response === 'D'){
        arrD.push(studentResponses[i].full_name)
      }



    }

    return { arrA, arrB, arrC, arrD }

  }

  makeGoalsTable = goals => {
    let x = '';
    return goals.map((goal, i) => {
      if ((i + 1) % 2 === 0 ? x = '-blue' : x = '-green')
        if ((i + 1) % 3 === 0) x = '-purple';
      return (
        <tr key={i}>
          <td className={`data-link-datum${x} datum`}>
            <Link to={`/data/${this.state.goalId}/${goal.student_goal_id}`} className='data-link'>{goal.full_name}</Link>
          </td>
          <td>{goal.complete ? 'Complete' : 'Incomplete'}</td>
          <td>{goal.eval_score}</td>
        </tr>
      )
    }
    )
  }

  render() {
    const { loaded, goalData, exitTicketInfo, exitTicketHidden } = this.state;

    if (!loaded) {
      return (<Loading />)
    }
    else {
      let goals = this.makeGoalsTable(goalData);

      let exitTicketElements;

      if (exitTicketInfo.length > 0 && exitTicketInfo[0].question_type !== null) {
        if (exitTicketInfo[0].question_type.toLowerCase() === 'multiple choice') {
          let correctAnswer = exitTicketInfo[0].answer
          let studentResponseRows = this.makeStudentResponseRows(goalData, correctAnswer);
          // let correctIndex = 0;
          // if (correctAnswer === 'B') {
          //   correctIndex = 1
          // } else if (correctAnswer === 'C') {
          //   correctIndex = 2
          // } else if (correctAnswer === 'D') {
          //   correctIndex = 3
          // }
          // let optionClass = 'incorrect-option';
          // let prefix = 'A: ';

          exitTicketElements = <div>
            <h3>{exitTicketInfo[0].question}</h3>
            <div className='exit-ticket-data-container'>
              <table className='data-table goal-data'>
                <thead>
                  <tr>
                    <th>Total Correct</th>
                    <th>Total Participants</th>
                    <th>Avg Correct</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{exitTicketInfo[0].correct_res_total}</td>
                    <td>{exitTicketInfo[0].res_total}</td>
                    <td>{exitTicketInfo[0].correct_res_avg}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='exit-ticket-response-container'>
              <h4>Student Responses</h4>
              {/* <div className='options-header'>           
              {exitTicketInfo[0].options.map((option, i) => {
              if(i === correctIndex){
                optionClass = 'correct-option'
              } 
              if(i === 1){
                prefix = 'B: '
              } else if (i === 2){
                prefix = 'C: '
              } else if (i === 3){
                prefix = 'D: '
              }
              return (
                
                <h4 key={i} className={optionClass}>{prefix}{option}</h4>
              
              )
            })}                
            </div> */}
              <div className="exit-ticket-responses">
                <div className="a-column">
                  {correctAnswer === 'A' ? <h5 className='correct-option option-title'>A<br></br>{exitTicketInfo[0].options[0]}</h5> : <h5 className='incorrect-option option-title'>A<br></br>{exitTicketInfo[0].options[0]}</h5>}
                  <ul>
                    {studentResponseRows.arrA.map((student, index) => <li key={index}>{student}</li>)}
                  </ul>
                </div>
                <div className="b-column">
                  {correctAnswer === 'B' ? <h5 className='correct-option option-title'>B<br></br>{exitTicketInfo[0].options[1]}</h5> : <h5 className='incorrect-option option-title'>B<br></br>{exitTicketInfo[0].options[1]}</h5>}
                  <ul>
                    {studentResponseRows.arrB.map((student, index) => <li key={index}>{student}</li>)}
                  </ul>
                </div>
                <div className="c-column">
                  {correctAnswer === 'C' ? <h5 className='correct-option option-title'>C<br></br>{exitTicketInfo[0].options[2]}</h5> : <h5 className='incorrect-option option-title'>C<br></br>{exitTicketInfo[0].options[2]}</h5>}
                  <ul>
                    {studentResponseRows.arrC.map((student, index) => <li key={index}>{student}</li>)}
                  </ul>
                </div>
                <div className="d-column">
                  {correctAnswer === 'D' ? <h5 className='correct-option option-title'>D<br></br>{exitTicketInfo[0].options[3]}</h5> : <h5 className='incorrect-option option-title'>D<br></br>{exitTicketInfo[0].options[3]}</h5>}
                  <ul>
                    {studentResponseRows.arrD.map((student, index) => <li key={index}>{student}</li>)}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        } else if (exitTicketInfo[0].question_type.toLowerCase() === 'short answer') {
          exitTicketElements = (<div className='short-answer-container'>
            <h3>{exitTicketInfo[0].question}</h3>
            <div className='contain-student-res'>
              {this.handleShortAnswerResponses(goalData)}
            </div>
          </div>)
        }

      } else {
        exitTicketElements = <p>No exit ticket submitted for this goal</p>

      }


      console.log(goalData)



      if (goals.length) {
        return (
          <div className='data-display-container'>
            <h3>{goalData[0].title}</h3>
            <div className='data-table-container'>
              <table className='data-table goal-data'>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Status</th>
                    <th>Eval</th>
                  </tr>
                </thead>
                <tbody>
                  {goals}
                </tbody>
              </table>
            </div>
            <button onClick={this.toggleExitTicketHidden} className='button purple-button'>{(exitTicketHidden) ? 'Hide Exit Ticket Info' : 'View exit ticket'}</button>
            <Link to={'/data'} className='button green-button data-button'>Go back</Link>
            {(exitTicketHidden) ? exitTicketElements : ''}
          </div>
        )
      } else {
        return <p>No data to display <Link to={'/data'}>Go back</Link></p>
      }



    }

  }
}

export default GoalDataDisplay;