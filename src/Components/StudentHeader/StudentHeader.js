import React from 'react';
import '../../Components/Header/Header.css';
import { Link } from 'react-router-dom';
import StudentContext from '../../Contexts/StudentContext';
import TokenService from '../../Services/token-service';

class StudentHeader extends React.Component {
  

  static contextType = StudentContext;

  handleLogoutClick = () => {
    this.context.processLogout();    
  }

  renderLogInLinks = () =>{
    return (
      <nav className="login-buttons">
        <Link to='/login/teacher' className='purple-button button'>Teacher Login</Link>
        <Link to='/login/student' className='blue-button button'>Student Login</Link>
        <Link to='/register' className='green-button button'>Sign Up</Link>
      </nav>
    )
  }

  renderStudentLogOutLinks = () => {
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
          ? this.renderStudentLogOutLinks()
          :this.renderLogInLinks()}
        </div>
      </header>
    );
  }
}

export default StudentHeader;