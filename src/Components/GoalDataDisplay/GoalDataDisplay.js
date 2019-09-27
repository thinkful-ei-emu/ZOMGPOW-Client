import React from 'react';
import TeacherContext from '../../Contexts/TeacherContext';
import TokenService from '../../Services/token-service';
import TeacherAuthApiService from '../../Services/teacher-auth-api-service';
import { Link } from 'react-router-dom';
import config from '../../config';


class GoalDataDisplay extends React.Component {


  state = {
    goalData: [],
    exitTicketInfo: [],
    goalId: this.props.match.params.goalId,
    classId: null,
    loaded: false,
  }

  static contextType = TeacherContext;



  componentDidMount() {

    console.log('From goal data', this.state.goalId, this.context.teacherClass.id)

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
    const { loaded, goalData, exitTicketInfo } = this.state;
    console.log(exitTicketInfo[0])

    if (!loaded) {
      return (<div>loading...</div>)
    }
    else {
      let goals = this.makeGoalsTable(goalData);
      let exitTicketElements;

      if (exitTicketInfo.length > 0 && exitTicketInfo[0].question_type !== null) {
        if(exitTicketInfo[0].question_type.toLowerCase() === 'multiple choice'){
          let correctAnswer = exitTicketInfo[0].answer
          let correctIndex = 0;
          if(correctAnswer === 'B'){
            correctIndex = 1
          } else if (correctAnswer === 'C'){
            correctIndex = 2
          } else if (correctAnswer === 'D'){
            correctIndex = 3
          }
          let optionClass = 'incorrect-option';

          exitTicketElements = <div>
          <h3>{exitTicketInfo[0].question}</h3> 
          <ul>
            {exitTicketInfo[0].options.map((option, i) => {
              if(i === correctIndex){
                optionClass = 'correct-option'
              }
              return (
                <li key={i} className={optionClass}>{option}</li>
              )
            })}
            </ul>   
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
        </div>
        } else if (exitTicketInfo[0].question_type.toLowerCase() === 'short answer'){

        }
        
      } else {
        exitTicketElements = <p>No exit ticket submitted for this goal</p>
      }


      console.log(goalData)



      if (goals.length) {
        return (
          <div>
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
            {exitTicketElements}
            <Link to={'/data'} className='button green-button data-button'>Go back</Link>
          </div>
        )
      } else {
        return <p>No data to display <Link to={'/data'}>Go back</Link></p>
      }



    }

  }
}

export default GoalDataDisplay;