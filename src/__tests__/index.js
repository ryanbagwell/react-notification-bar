import React from 'react';
import NotificationBar from '../NotificationBar';
import {shallow, mount, render, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const message = 'Hello World!';


test('Component contains supplied message', () => {

  const bar = render(
    <NotificationBar message={message} />
  );

  expect(bar.find('.NotificationBar__message').text()).toEqual(message);

});


test('Component is hidden when close icon is clicked', () => {

  const bar = mount(
    <NotificationBar message={message} />
  );

  bar.find('.NotificationBar__close').simulate('click');

  expect(bar.state('open')).toEqual(false);


});