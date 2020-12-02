import React from 'react';
import Enzyme, { shallow, configure } from 'enzyme';
import Reviewform from './Reviewform.js'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('Reviewform', () => {
    test('it renders the two buttons', () => {
      const wrapper = shallow(<Reviewform />);
      expect(wrapper.find('.variant')).toMatchSnapshot();
    });
  });
