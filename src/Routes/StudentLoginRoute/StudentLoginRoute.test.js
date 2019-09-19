import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import StudentLoginRoute from './StudentLoginRoute';

describe(`StudentLoginRoute component`, () => {
  it('renders a .StudentLoginRoute by default', () => {
    const wrapper = shallow(<StudentLoginRoute />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})