import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RegistrationRoute from '../../Routes/RegistrationRoute/RegistrationRoute';
import Header from '../Header/Header';
import StudentHeader from '../StudentHeader/StudentHeader';
import PrivateRoute from '../../Utils/PrivateRoute';
import PublicOnlyTeacherRoute from '../../Utils/PublicOnlyTeacherRoute';
import PublicOnlyStudentRoute from '../../Utils/PublicOnlyStudentRoute';
import LandingPage from '../LandingPage/LandingPage';
import TeacherLoginRoute from '../../Routes/TeacherLoginRoute/TeacherLoginRoute';
import StudentDashboard from '../../Routes/StudentDashboard/StudentDashboard';
import StudentLoginRoute from '../../Routes/StudentLoginRoute/StudentLoginRoute';
import TeacherDashboardRoute from '../../Routes/TeacherDashboardRoute/TeacherDashboardRoute';
import SessionRoute from '../../Routes/SessionRoute/SessionRoute';
import NotFoundRoute from '../../Routes/NotFoundRoute/NotFoundRoute';
import SelfEvaluate from '../SelfEvaluate/SelfEvaluate';
import DataDisplay from '../../Routes/DataDisplayRoute/DataDisplayRoute';
import ExitTicketStudentRoute from '../../Routes/ExitTicketStudentRoute/ExitTicketStudentRoute';
import ExitTicketTeacherRoute from '../../Routes/ExitTicketTeacherRoute/ExitTicketTeacherRoute';
import GoalDataDisplay from '../../Components/GoalDataDisplay/GoalDataDisplay';
import SubGoalDataDisplay from '../../Components/SubGoalDataDisplay/SubGoalDataDisplay';
import config from '../../config';
import './App.css';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      studentTimers: [],
      headerType: null,
    };
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

  handleHeaderType = (type) => {
    this.setState({
      headerType: type
    })
  }


  render() {
   let headerType = this.state.headerType === config.STUDENT ? <StudentHeader /> : <Header />
    return (
      <div className="App">
      <main>
        {headerType}
        <Switch>
          <PublicOnlyTeacherRoute
            path='/login/teacher'
            render={(props) => {
              return (
                <TeacherLoginRoute {...props}
                handleHeaderType={this.handleHeaderType}
                />
              )
            }}
          />
          <PublicOnlyTeacherRoute
            path='/register'
            component={RegistrationRoute}
          />
          <Route
            exact path='/'
            component={LandingPage}
          />
          <PublicOnlyStudentRoute
            path='/login/student'
            render={(props) => {
              return (
                <StudentLoginRoute {...props}
                handleHeaderType={this.handleHeaderType}
                />
              )
            }}
          />
          <PrivateRoute
            path='/dashboard/teacher'
            render={(props) => {
              return (
                <TeacherDashboardRoute {...props}
                 />
              )
            }}
          />
          <PrivateRoute
            path='/session'
            render={(props) => {
              return (
                <SessionRoute {...props}
                 handleStudentTimers={this.handleStudentTimers}
                 />
              )
            }}
          />
          <PrivateRoute
            path='/dashboard/student'
            render={(props) => {
              return (
                
                <StudentDashboard {...props} studentTimers={this.state.studentTimers} />
                
              );
            }}
          />
          
          <PrivateRoute
            path='/selfEvaluate'
            render={(props)=> {
              return (
                <SelfEvaluate {...props}/>
              )
            }}
          />
          <Route
            exact
            path='/data'
            render={(props)=> {
              return (
                <DataDisplay {...props}/>
              )
            }}
          />
          <Route
            exact
            path='/data/:goalId'
            component={GoalDataDisplay}
          />
          <Route
            exact
            path='/data/:goalId/:studentGoalId'
            component={SubGoalDataDisplay}
          />
          <Route
            path='/exitTicket'
            render={(props)=> {
              return (
                <ExitTicketTeacherRoute {...props}/>
              )
            }}
            />
            <PrivateRoute
              path='/student/exitTicket'
              render={(props)=> {
                return (
                  <ExitTicketStudentRoute {...props}/>
                )
              }}
            />
            <Route
              component={NotFoundRoute}
            />
            
          </Switch>
        </main>
      </div>
    );
  }
}

