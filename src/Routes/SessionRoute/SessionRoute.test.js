import React from 'react';
import ReactDOM from 'react-dom';
import SessionRoute from './SessionRoute';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<SessionRoute />, div);

  ReactDOM.unmountComponentAtNode(div);
});