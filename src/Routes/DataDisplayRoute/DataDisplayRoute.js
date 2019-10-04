import React from 'react';
import config from '../../config';
import { Link } from 'react-router-dom';
import TokenService from '../../Services/token-service';
import TeacherContext from '../../Contexts/TeacherContext';
import Loading from '../../Components/Loading/Loading';
import TeacherAuthApiService from '../../Services/teacher-auth-api-service';
import './DataDisplayO.css';

class DataDisplay extends React.Component {
  static contextType = TeacherContext;

  state = {
    loaded: false,
    classId: null,
    dataArr: [],
  }

  componentDidMount() {
    
    if (TokenService.getAuthToken() && !this.state.classId) {
      TeacherAuthApiService.getTeacherClasses()
        .then(classes => this.context.setClass(classes[0]))
        .then(() => this.setState({
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
    let x = '';
    
    return goals.map((goal, i) => {
      if((i + 1) % 2 === 0 ? x = '-blue' : x = '-green')
      if((i + 1) % 3 === 0) x = '-purple';
      return (
      <tr key={i}>
        <td className={`data-link-datum${x} datum`}>
          <Link to={`/data/${goal.id}`} className='data-link'>{goal.goal_title}</Link>
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
      </tr>
      )
    }
      )
  }

  render() {
    const { loaded, dataArr } = this.state;

    if (!loaded) {
      return (<Loading />)
    }
    else {
      let goals = this.makeGoalsTable(dataArr);
      
      if(goals.length){
        return (
          <div className='data-display-container'>
            <h3>Goals Data</h3>
            <div className='data-table-container'>
              <table className = 'data-table main-table'>
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