import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import StudentTimer from './StudentTimer';

describe(`StudentTimer component`, () => {
  it('renders a .StudentTimer by default', () => {
    const wrapper = shallow(<StudentTimer />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})