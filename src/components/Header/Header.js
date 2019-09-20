import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import TeacherContext from '../../Contexts/TeacherContext';
import TokenService from '../../Services/token-service';

class Header extends React.Component {
  static contextType = TeacherContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  }

  renderLogInLinks(){
    return (
      <nav className="login-buttons">
        <Link to='/login/teacher' className='teacher'>Teacher Login</Link>
        <Link to='/login/student' className='student'>Student Login</Link>
        <Link to='/register' className='sign-up'>Sign Up</Link>
      </nav>
    )
  }

  renderLogOutLinks(){
    return (
      <nav>
        <Link to='/link/path'>Link</Link>
        {' '}
        <Link 
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </nav>
    )
  }


  render(){
    return (
      <header className="header" role="banner">
        <h1>
          <Link to='/'>
          Sprout
          </Link>
        </h1>
        <div className="links">
          {TokenService.hasAuthToken() 
          ? this.renderLogOutLinks()
          :this.renderLogInLinks()}
        </div>
      </header>
    );
  }
}

export default Header;