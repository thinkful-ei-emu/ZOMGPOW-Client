import React from 'react';
import LearningTargetForm from '../../Components/LearningTargetForm/LearningTargetForm';
import StudentList from '../../Components/StudentList/StudentList';
import './TeacherDashboardRoute.css';
import TeacherContext from '../../Contexts/TeacherContext';

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
  }

  render() {
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

export default TeacherDashboardRoute;