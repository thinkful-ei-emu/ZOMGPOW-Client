import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RegistrationRoute from './Routes/RegistrationRoute/RegistrationRoute';
import './App.css';
import Header from './components/Header/Header';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/register/teacher' component={RegistrationRoute} />
        <Route exact path='/' component={LandingPage}/>
      </Switch>
      
      
    </div>
  );
}

export default App;
