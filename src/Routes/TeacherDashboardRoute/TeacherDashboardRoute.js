import React from 'react';
import LearningTargetForm from '../../Components/LearningTargetForm/LearningTargetForm';
import StudentList from '../../Components/StudentList/StudentList';
import './TeacherDashboardRoute.css';
import TeacherContext from '../../Contexts/TeacherContext';
import TeacherAuthApiService from '../../Services/teacher-auth-api-service';
import TokenService from '../../Services/token-service';
import { Link } from 'react-router-dom';

class TeacherDashboardRoute extends React.Component{
  state = {
    error: null,
    classId: null,
    students: [],
    loaded: false,
  }
  static contextType = TeacherContext;

  componentDidMount = () => {
    let token;
    let classId = this.state.classId;
    if(TokenService.getAuthToken() && !classId){
      token = TokenService.parseAuthToken()

    TeacherAuthApiService.getTeacherClasses()
      .then(classes => this.context.setClass(classes[0]))
      .then(() => this.setState({
        loaded: true,
        classId: this.context.teacherClass.id
      })
      )
    } else {
      const classId = this.context.teacherClass.id;
      this.setState({
        loaded: true,
        classId
      })
    }
  }

  displayStudents = (resStudents) => {
    this.setState({
      students: resStudents.students,
    })
  }

  addStudents = (res) => {
    this.setState({
      students: [...this.state.students, res],      
    })
  }

  removeStudent = (user_name) => {
    let students = this.state.students
    let newStudents = students.filter(student => student.user_name !== user_name)
    this.setState({
      students: newStudents,
    })
  }

  render() {
    console.log(this.props, 'DASH PROPS')
    const {loaded, students} = this.state;
    if(!loaded){
      return <div><p>loading...</p></div>
    } else {
      return (
        <section className='TeacherDashboardRoute-section'>
          <Link to={'/data'}>Data display</Link>
        {students.length > 0 ? <div className='TeacherDashboardRoute-learning-target-submit'>
            <LearningTargetForm history={this.props.history} classId={this.state.classId}/>
          </div>: <></>}
          <div className='TeacherDashboardRoute-student-list'>
            <StudentList 
              addStudents= {this.addStudents} 
              removeStudent={this.removeStudent} 
              displayStudents= {this.displayStudents} 
              classId={this.state.classId} 
              students={this.state.students}/>
          </div>
        </section>
      );
    } 
  }
}

export default TeacherDashboardRoute;