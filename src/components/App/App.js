import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RegistrationRoute from '../../Routes/RegistrationRoute/RegistrationRoute';
import Header from '../Header/Header';
import LandingPage from '../LandingPage/LandingPage';
import TeacherLoginRoute from '../../Routes/TeacherLoginRoute/TeacherLoginRoute';
import StudentLoginRoute from '../../Routes/StudentLoginRoute/StudentLogin';
import TeacherDashboardRoute from '../../Routes/TeacherDashboardRoute/TeacherDashboardRoute';
import './App.css';

export default class App extends React.Component {
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
        </Switch>
      </div>
    );
  }
}

