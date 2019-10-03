import React from 'react';
import ReactDOM from 'react-dom';
import DataDisplayRoute from './DataDisplayRoute';
import { MemoryRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

it.only('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <BrowserRouter>

        <DataDisplayRoute />

    </BrowserRouter>, 
    );
    ReactDOM.unmountComponentAtNode(div);
  });
