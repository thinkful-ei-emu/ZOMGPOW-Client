import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TeacherDashboardRoute from './TeacherDashboardRoute';

describe(`TeacherDashboardRoute component`, () => {
  it('renders a .TeacherDashboardRoute by default', () => {
    const wrapper = shallow(<TeacherDashboardRoute />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})