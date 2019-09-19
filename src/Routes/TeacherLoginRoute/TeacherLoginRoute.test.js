import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TeacherLoginRoute from './TeacherLoginRoute';

describe(`TeacherLoginRoute component`, () => {
  it('renders a .TeacherLoginRoute by default', () => {
    const wrapper = shallow(<TeacherLoginRoute />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})