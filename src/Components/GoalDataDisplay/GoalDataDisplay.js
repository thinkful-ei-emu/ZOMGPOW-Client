import React from 'react';
import TeacherContext from '../../Contexts/TeacherContext';
import TokenService from '../../Services/token-service';
import TeacherAuthApiService from '../../Services/teacher-auth-api-service';
import { Link } from 'react-router-dom';
import config from '../../config';


class GoalDataDisplay extends React.Component {


  state = {
    goalData: [],
    goalId: this.props.match.params.goalId,
    classId: null,
    loaded: false,
  }

  static contextType = TeacherContext;
  


  componentDidMount(){

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
              goalData: resData.studentResponses
            }))
        }))

    } 
  }

  makeGoalsTable = goals => {
    return goals.map((goal, i) =>
      <tr key={i}>
        <td>{goal.full_name}</td>
        <td>{goal.complete ? 'Complete' : 'Incomplete'}</td>
        <td>{goal.eval_score}</td>
      </tr>)
  }

  render(){
    const { loaded, goalData } = this.state;

    if (!loaded) {
      return (<div>loading...</div>)
    }
    else {
      let goals = this.makeGoalsTable(goalData);
      console.log(goalData)
 

      if(goals.length){
        return (
          <div>
            <h3>{goalData[0].title}</h3>
            <div className='data-table-container'>
              <table className='data-table'>
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
            <Link to={'/data'}>Go back</Link>
          </div>
        )
      } else {
        return <p>No data to display <Link to={'/data'}>Go back</Link></p>
      }
       
      

    }
    
  }
}

export default GoalDataDisplay;