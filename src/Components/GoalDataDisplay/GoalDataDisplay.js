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
      let exitTicketElement;

      // if(exitTicketInfo[0] !== null){
      //   exitTicketElement = <div>
      //     <h4>{exitTicketInfo[0]['question']}</h4>
      //   </div>

      // }
   

      if (exitTicketInfo.length > 0) {
        exitTicketElement =<div>
          <h3>{exitTicketInfo[0].title}</h3>    
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
           <tr>
             <td></td>
           </tr>
              </tbody>
            </table>
          </div>
          {/* <Link to={'/data'} className='button green-button data-button'>Go back</Link> */}
        </div>
      }


      console.log(goalData)




      if (goals.length) {
        return (
          <div>
            <h3>{goalData[0].title}</h3>
            {exitTicketElement}
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