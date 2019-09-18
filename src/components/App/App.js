import React from 'react';
import { Route } from 'react-router-dom';
import TeacherLoginRoute from '../../routes/TeacherLoginRoute/TeacherLoginRoute';
import './App.css';

export default class App extends React.Componet {
  render(){
    return (
      <div className="App">
         <Route 
           path={'/teacher-login'}
           component={TeacherLoginRoute}
         />  
      </div>
    );
  }
}

