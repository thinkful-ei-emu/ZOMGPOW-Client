import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RegistrationRoute from './routes/RegistrationRoute/RegistrationRoute';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/register/teacher' component={RegistrationRoute} />
      </Switch>
      
    </div>
  );
}

export default App;
