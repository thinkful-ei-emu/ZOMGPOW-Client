import React from './node_modules/react';
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
    history.push('/login')
  }

  render() {
    return (
      <section>
        <h2>Sign up</h2>
        <RegistrationForm 
          onRegistrationSuccess={this.hnadleRegistrationSuccess}/>
      </section>
    )
  }
}

export default RegistrationRoute;