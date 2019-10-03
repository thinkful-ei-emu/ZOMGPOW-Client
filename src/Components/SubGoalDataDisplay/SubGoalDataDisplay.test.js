import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SubGoalDataDisplay from './SubGoalDataDisplay';

describe(`SubGoalDataDisplay component`, () => {
  it('renders a .SubGoalDataDisplay by default', () => {
    const wrapper = shallow(<SubGoalDataDisplay />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})