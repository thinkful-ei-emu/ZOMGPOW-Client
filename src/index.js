import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';
import { TeacherProvider } from './Contexts/TeacherContext';
import { StudentProvider } from './Contexts/StudentContext';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(far, fas)

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
