import React, { Component } from 'react';
import TeacherLoginForm from '../../Components/TeacherLoginForm/TeacherLoginForm';
import './TeacherLoginRoute.css';

class TeacherLoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
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