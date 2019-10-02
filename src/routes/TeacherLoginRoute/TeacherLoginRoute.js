import React, { Component } from 'react';
import TeacherLoginForm from '../../Components/TeacherLoginForm/TeacherLoginForm';
import config from '../../config';
import './TeacherLoginRoute.css';

class TeacherLoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }
 
  handleLoginSuccess = () => {
    this.props.handleHeaderType(config.TEACHER);
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/dashboard/teacher'
    history.push(destination)
  }

  render() {
    return (
      <section className="teacher-login">
        <TeacherLoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    );
  }
}

export default TeacherLoginRoute;