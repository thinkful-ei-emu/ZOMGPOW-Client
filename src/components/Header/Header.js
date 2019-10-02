import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import TeacherContext from '../../Contexts/TeacherContext';
import TokenService from '../../Services/token-service';
import PurpleSprout from '../../Images/purple-sprout.svg';
import GreenSprout from '../../Images/green-sprout.svg';
import BlueSprout from '../../Images/blue-sprout.svg';

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
    let disabled;
    if(!this.context.sessionStarted){
      disabled = true;
    } else {
      disabled = false
    }
    return (
      <nav className='logout-buttons'>
        <Link to='/dashboard/teacher' className='purple-button button'>Dashboard</Link>
        {disabled ? '' : <Link to='/session' className='green-button button'>Session Goals</Link>}
        <Link to='/data' className='blue-button button'>Data Display</Link>
        <Link 
          onClick={this.handleLogoutClick}
          to='/'
          className='red-button button'>
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
          className='red-button button'>
          Logout
        </Link>
      </nav>
    )
  }

  render(){
    return (
      <header className="header" role="banner">
      
        <h1>
          <img src={GreenSprout} alt='sprout' height='80px' width='80px'/>
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