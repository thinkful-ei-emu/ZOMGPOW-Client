import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RegistrationRoute from '../../Routes/RegistrationRoute/RegistrationRoute';
import Header from '../Header/Header';
import LandingPage from '../LandingPage/LandingPage';
import TeacherLoginRoute from '../../Routes/TeacherLoginRoute/TeacherLoginRoute';
import StudentDashboard from '../../Routes/StudentDashboard/StudentDashboard';
import StudentLoginRoute from '../../Routes/StudentLoginRoute/StudentLoginRoute';
import TeacherDashboardRoute from '../../Routes/TeacherDashboardRoute/TeacherDashboardRoute';
import SessionRoute from '../../Routes/SessionRoute/SessionRoute';
import NotFoundRoute from '../../Routes/NotFoundRoute/NotFoundRoute';
import SelfEvaluate from '../SelfEvaluate/SelfEvaluate';
import DataDisplay from '../../Routes/DataDisplayRoute/DataDisplayRoute';
import './App.css';

export default class App extends React.Component {

  state = {
    studentTimers: [],
  }


  handleStudentTimers = (studentUsername, time) => {
    let start = Date.now();
    let end = start + time;
    const timerObj = {
      student: studentUsername,
      start,
      end
    }

    let newTimers = this.state.studentTimers
    newTimers.push(timerObj)

    this.setState({
      studentTimers: newTimers
    })    
  }


  render(){
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route 
            path='/login/teacher'
            component={TeacherLoginRoute}
          />  
          <Route
            path='/register'
            component={RegistrationRoute}
          />
          <Route
            exact path='/'
            component={LandingPage}
          />
          <Route
            path='/login/student'
            component={StudentLoginRoute}
          />
          <Route
            path='/dashboard/teacher'
            component={TeacherDashboardRoute}
          />
          <Route 
            path='/session'
            render={() => {
              return (
                <SessionRoute handleStudentTimers={this.handleStudentTimers}/>
              )
            }}
           />
          <Route
            path='/dashboard/student'
            render={() => {
              return (
                <StudentDashboard studentTimers={this.state.studentTimers}/>
              );
            }}
          />
          <Route
            path='/selfEvaluate'
            component={SelfEvaluate}
          />
          <Route 
            path='/data'
            component={DataDisplay}
          />
          <Route
            component={NotFoundRoute}
          />
        </Switch>
      </div>
    );
  }
}

