import React from 'react';
import './Header.css';

class Header extends React.Component {

  renderLogInLinks(){
    return (
      <div className="login-buttons">
        <button>Login</button>
        <button>Sign Up</button>
      </div>
    )
  }

  renderLogOutLinks(){
    return (
      <div className="login-buttons">
        <button>Link</button>
        <button>Logout</button>
      </div>
    )
  }


  render(){
    return (
      <header className="header" role="banner">
        <h1>Name of Application</h1>
        <div className="links">
          {this.renderLogInLinks()}
          {this.renderLogOutLinks()}
          {/* {loggedIn 
          ? this.renderLogOutLinks()
          :this.renderLogInLinks()} */}
        </div>
      </header>
    )
  }
}

export default Header;