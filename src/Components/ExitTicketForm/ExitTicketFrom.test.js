import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ExitTicketForm from './ExitTicketForm';

describe(`ExitTicketForm component`, () => {
  it('renders a .ExitTicketForm by default', () => {
    const wrapper = shallow(<ExitTicketForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})