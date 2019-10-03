import React from 'react';
import ReactDOM from 'react-dom';
import ExitTicketTeacherRoute from './ExitTicketTeacherRoute';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<ExitTicketTeacherRoute />, div);

  ReactDOM.unmountComponentAtNode(div);
});