import React from 'react';
import config from '../../config';
import { Link } from 'react-router-dom';
import TokenService from '../../Services/token-service';
import TeacherContext from '../../Contexts/TeacherContext'
import TeacherAuthApiService from '../../Services/teacher-auth-api-service'
import './DataDisplay.css'

class DataDisplay extends React.Component {
  static contextType = TeacherContext;

  state = {
    loaded: false,
    classId: null,
    dataArr: [],
  }

  componentDidMount() {
    console.log('component data display')

    let token;

    if (TokenService.getAuthToken() && !this.state.classId) {
      token = TokenService.parseAuthToken()
      console.log('token from teacher dashboard', token)

      TeacherAuthApiService.getTeacherClasses()
        .then(classes => this.context.setClass(classes[0]))
        .then(() => this.setState({
          loaded: true,
          classId: this.context.teacherClass.id
        }, () => {
          return fetch(`${config.API_ENDPOINT}/data/${this.state.classId}`, {
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
              dataArr: resData.dataArr
            }))
        }))

    } else {
      const classId = this.context.teacherClass.id;

      this.setState({
        classId: classId
      }, () => {
        return fetch(`${config.API_ENDPOINT}/data/${this.state.classId}`, {
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
          .then(resData =>
            this.setState({
              loaded: true,
              dataArr: resData.dataArr
            }))
      })
    }
  }
  makeGoalsTable = goals => {
    return goals.map((goal, i) =>
      <tr key={i}>
        <td>
          <Link to={`/data/${goal.id}`}>{goal.goal_title}</Link>
        </td>
        <td>
          {goal.total_completed}
        </td>
        <td>
          {goal.total_students}
        </td>
        <td>
          {goal.avg_completed}
        </td>
        <td>
          {goal.time}
        </td>
        <td>
          {goal.eval_percentage}
        </td>
        <td>
          {goal.eval_avg}
        </td>
      </tr>)
  }

  render() {
    const { loaded, dataArr } = this.state;

    if (!loaded) {
      return (<div>loading...</div>)
    }
    else {
      let goals = this.makeGoalsTable(dataArr);
      console.log(dataArr)

      if(goals.length){
        return (
          <div>
            <h3>Goals Data</h3>
            <div className='data-table-container'>
              <table className='data-table'>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Total Completed</th>
                    <th>Total Students</th>
                    <th>Completion Rate</th>
                    <th>Completion Time</th>
                    <th>Confidence Rate</th>
                    <th>Confidence Avg Score</th>
                  </tr>
                </thead>
                <tbody>
                  {goals}
                </tbody>
              </table>
            </div>
          </div>
        )
      } else {
        return <p>No data to display</p>
      }
       
      

    }

  }

}

export default DataDisplay 