import React from 'react';
import LearningTargetForm from '../../Components/LearningTargetForm/LearningTargetForm';
import StudentList from '../../Components/StudentList/StudentList';
import './TeacherDashboardRoute.css';
import TeacherContext from '../../Contexts/TeacherContext';
import TeacherAuthApiService from '../../Services/teacher-auth-api-service';
import TokenService from '../../Services/token-service';

class TeacherDashboardRoute extends React.Component{
  state = {
    error: null,
    class_id: null,
    students: [],
    loaded: false,
  }
  static contextType = TeacherContext;

  componentDidMount = () => {
    let token;

    if(TokenService.getAuthToken() && !this.state.class_id){
      token = TokenService.parseAuthToken()
      console.log('token from teacher dashboard', token)

    TeacherAuthApiService.getTeacherClasses()
      .then(classes => this.context.setClass(classes[0]))
      .then(() => this.setState({
        loaded: true,
        class_id: this.context.teacherClass.id
      }, () => console.log(this.state.class_id)))

    } else {
      const class_id = this.context.teacherClass.id;

      this.setState({
        loaded: true,
        class_id
      })
    }
  }

  render() {
    const {loaded} = this.state;

    if(!loaded){
      return <div><p>loading...</p></div>
    } else {
      return (
        <section className='TeacherDashboardRoute-section'>
          <div className='TeacherDashboardRoute-learning-target-submit'>
            <LearningTargetForm history={this.props.history} class_id={this.state.class_id}/>
          </div>
          <div className='TeacherDashboardRoute-student-list'>
            <StudentList class_id={this.state.class_id} students={this.state.students}/>
          </div>
        </section>
      );
    } 
  }
}

export default TeacherDashboardRoute;