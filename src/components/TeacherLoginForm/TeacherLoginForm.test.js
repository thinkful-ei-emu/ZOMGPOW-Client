import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TeacherLoginForm from './TeacherLoginForm';

describe(`TeacherLoginForm component`, () => {
  it('renders a .TeacherLoginForm by default', () => {
    const wrapper = shallow(<TeacherLoginForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})