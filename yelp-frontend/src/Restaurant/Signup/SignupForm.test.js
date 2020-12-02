import React from 'react';
import Enzyme, { shallow, configure } from 'enzyme';
import SignupForm from './SignupForm.jsx'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('SignupForm', () => {
    test('it renders the two buttons', () => {
      const wrapper = shallow(<SignupForm />);
      expect(wrapper.find('.variant')).toMatchSnapshot();
    });
  });
