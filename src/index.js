import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';
import { TeacherProvider } from './Contexts/TeacherContext';
import { StudentProvider } from './Contexts/StudentContext';


ReactDOM.render(
  <BrowserRouter>
    <TeacherProvider>
      <StudentProvider>
        <App />
      </StudentProvider>
    </TeacherProvider>
  </BrowserRouter>,
  document.getElementById('root'));

serviceWorker.unregister();
