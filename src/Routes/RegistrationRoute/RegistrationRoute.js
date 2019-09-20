import React from 'react';
import RegistrationForm from '../../Components/RegistrationForm/RegistrationForm';
import './RegistrationRoute.css';

class RegistrationRoute extends React.Component {
  static defaultProps = {
    history: {
      push: () => {}
    },
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push('/login/teacher')
  }

  render() {
    return (
      <section className="teacher-registration">
        <RegistrationForm 
          onRegistrationSuccess={this.handleRegistrationSuccess}/>
      </section>
    )
  }
}

export default RegistrationRoute;