import React from 'react';
import LearningTargetForm from '../../Components/LearningTargetForm/LearningTargetForm';
import StudentList from '../../Components/StudentList/StudentList';
import './TeacherDashboardRoute.css';
import TeacherContext from '../../Contexts/TeacherContext';
import config from '../../config'
import TokenService from '../../Services/token-service'


class TeacherDashboardRoute extends React.Component{
  state = {
    error: null,
    class_id: null,
    students: []
  }
  static contextType = TeacherContext;

  componentDidMount = () => {
    const class_id = this.context.teacherClass.teacherClass.id;
    this.setState({
      class_id: class_id
    })
    return fetch(`${config.API_ENDPOINT}/class/${this.state.class_id}/students`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
      .then(resStudents => {
          (console.log(resStudents))
        this.setState({
          students: resStudents,
        })
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
    }

  render() {
    return (
      <section className='TeacherDashboardRoute-section'>
        <div className='TeacherDashboardRoute-learning-target-submit'>
          <LearningTargetForm history={this.props.history} class_id={this.state.class_id}/>
        </div>
        <div className='TeacherDashboardRoute-student-list'>
          <StudentList students={this.state.students}/>
        </div>
      </section>
    );
  }
}

export default TeacherDashboardRoute;