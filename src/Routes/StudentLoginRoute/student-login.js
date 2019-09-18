import React from 'react';
import './student-login.css';


class StudentLogin extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    const {username} = e.target
  }


  render() {


    return (
      <div className="student-login">
        <form className="student-login-form" onSubmit={this.handleSubmit}>
        <label>Username:</label><br></br>
          <input className= "student-username" name="student-username" required></input><br></br>
          <button type="submit">Submit</button>
        </form>
   
      </div>
    );
  }
  
}

export default StudentLogin;