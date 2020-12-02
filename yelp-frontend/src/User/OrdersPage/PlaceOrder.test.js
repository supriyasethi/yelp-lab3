import React from 'react';
import Enzyme, { shallow, configure } from 'enzyme';
import PlaceOrder from './PlaceOrder.jsx'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('PlaceOrder', () => {
    test('it renders the two buttons', () => {
      const wrapper = shallow(<PlaceOrder />);
      expect(wrapper.find('.variant')).toMatchSnapshot();
    });
  });
