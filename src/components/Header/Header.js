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
        <Link to='/login/teacher' className='purple-button button'>Teacher Login</Link>
        <Link to='/login/student' className='blue-button button'>Student Login</Link>
        <Link to='/register' className='green-button button'>Sign Up</Link>
      </nav>
    )
  }

  renderLogOutLinks(){
    if(this.context.teacherClass){
      return this.renderTeacherLogOutLinks()
    } else {
      return this.renderStudentLogOutLinks()
    }
  }

  renderTeacherLogOutLinks(){
    return (
      <nav className='logout-buttons'>
        <Link to='/dashboard/teacher' className='purple-button button'>Dashboard</Link>
        <Link to='/session' className='blue-button button'>Session Goals</Link>
        <Link to='/data' className='red-button button'>Data</Link>
        <Link 
          onClick={this.handleLogoutClick}
          to='/'
          className='green-button button'>
          Logout
        </Link>
      </nav>
    )
  }

  renderStudentLogOutLinks(){
    return (
      <nav className='logout-buttons'>
        <Link 
          onClick={this.handleLogoutClick}
          to='/'
          className='green-button button'>
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