import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import StudentList from './StudentList';

describe(`StudentList component`, () => {
  it('renders a .StudentList by default', () => {
    const wrapper = shallow(<StudentList />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})