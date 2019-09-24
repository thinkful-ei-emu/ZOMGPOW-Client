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
    classId: null,
    students: [],
    loaded: false,
  }
  static contextType = TeacherContext;

  componentDidMount = () => {
    let token;

    if(TokenService.getAuthToken() && !this.state.classId){
      token = TokenService.parseAuthToken()
      console.log('token from teacher dashboard', token)

    TeacherAuthApiService.getTeacherClasses()
      .then(classes => this.context.setClass(classes[0]))
      .then(() => this.setState({
        loaded: true,
        classId: this.context.teacherClass.id
      }, () => console.log(this.state.classId)))

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

  removeStudent = (username) => {
    let students = this.state.students
    let newStudents = students.filter(student => student.username !== username)
    this.setState({
      students: newStudents,
    })
  }

  render() {
    const {loaded, students} = this.state;
    // console.log('students', this.state.students)
    if(!loaded){
      return <div><p>loading...</p></div>
    } else {
      return (
        <section className='TeacherDashboardRoute-section'>
        {students.length > 0 ?<div className='TeacherDashboardRoute-learning-target-submit'>
            
            <LearningTargetForm history={this.props.history} class_id={this.state.classId}/>
          </div>: <></>}
      
          <div className='TeacherDashboardRoute-student-list'>
            <StudentList addStudents= {this.addStudents} removeStudent={this.removeStudent} displayStudents= {this.displayStudents} class_id={this.state.classId} students={this.state.students}/>
          </div>
        </section>
      );
    } 
  }
}

export default TeacherDashboardRoute;