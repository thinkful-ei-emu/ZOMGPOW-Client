import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import GoalDataDisplay from './GoalDataDisplay';

describe(`GoalDataDisplay component`, () => {
  it('renders a .GoalDataDisplay by default', () => {
    const wrapper = shallow(<GoalDataDisplay />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})