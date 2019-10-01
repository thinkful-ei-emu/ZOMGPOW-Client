import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SelfEvaluate from './SelfEvaluate';

describe(`SelfEvaluate component`, () => {
  it('renders a .SelfEvaluate by default', () => {
    const wrapper = shallow(<SelfEvaluate />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})