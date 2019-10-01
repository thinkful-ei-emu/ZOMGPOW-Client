import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ExitTicketStudent from './ExitTicketStudent';

describe(`ExitTicketStudent component`, () => {
  it('renders a .ExitTicketStudent by default', () => {
    const wrapper = shallow(<ExitTicketStudent />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})