import React from 'react';
import ReactDOM from 'react-dom';
import ExitTicketStudentRoute from './ExitTicketStudentRoute';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<ExitTicketStudentRoute />, div);

  ReactDOM.unmountComponentAtNode(div);
});