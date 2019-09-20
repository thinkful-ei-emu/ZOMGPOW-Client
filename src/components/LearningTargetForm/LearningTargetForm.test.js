import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LearningTargetForm from './LearningTargetForm';

describe(`LearningTargetForm component`, () => {
  it('renders a .LearningTargetForm by default', () => {
    const wrapper = shallow(<LearningTargetForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})