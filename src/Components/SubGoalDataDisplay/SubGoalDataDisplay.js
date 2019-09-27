import React from 'react';
import TeacherContext from '../../Contexts/TeacherContext';
import TokenService from '../../Services/token-service';
import TeacherAuthApiService from '../../Services/teacher-auth-api-service';
import { Link } from 'react-router-dom';
import config from '../../config';


class SubGoalDataDisplay extends React.Component {


  state = {
    subGoalData: [],
    studentGoalId: this.props.match.params.studentGoalId,
    goalId: this.props.match.params.goalId,
    classId: null,
    loaded: false,
  }

  static contextType = TeacherContext;



  componentDidMount() {

    console.log('From goal data', this.state.studentGoalId, this.state.goalId, this.context.teacherClass.id)

    if (TokenService.getAuthToken() && !this.state.classId) {
      TeacherAuthApiService.getTeacherClasses()
        .then(classes => this.context.setClass(classes[0]))
        .then(() => this.setState({
          classId: this.context.teacherClass.id
        }, () => {
          return fetch(`${config.API_ENDPOINT}/data/${this.state.classId}/${this.state.goalId}/${this.state.studentGoalId}`, {
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
              subGoalData: resData.studentSubgoals
            }))
        }))

    }
  }

  makeGoalsTable = goals => {
    return goals.map((goal, i) =>
      <tr key={i}>
        <td>{goal.title}</td>
        <td>{goal.complete ? 'Complete' : 'Incomplete'}</td>
        <td>{goal.eval_score === null ? 'none' : goal.eval_score}</td>
      </tr>)
  }

  render() {
    const { loaded, subGoalData } = this.state;

    if (!loaded) {
      return (<div>loading...</div>)
    }
    else {
      let subGoals = this.makeGoalsTable(subGoalData);
      console.log(subGoalData)


      if (subGoals.length) {
        return (
          <div>
            <h3>{subGoalData[0].full_name}</h3>
            <div className='data-table-container'>
              <table className='data-table goal-data'>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Eval</th>
                  </tr>
                </thead>
                <tbody>
                  {subGoals}
                </tbody>
              </table>
            </div>
            <Link to={`/data/${this.state.goalId}`} className='button green-button data-button'>Go back</Link>
          </div>
        )
      } else {
        return (
          <div>
            <p>There were no sub-goals for this student</p>
            <Link to={`/data/${this.state.goalId}`} className='button green-button data-button'>Go back</Link>
          </div>
        )

      }



    }

  }
}

export default SubGoalDataDisplay;