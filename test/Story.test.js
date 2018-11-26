import React from 'react';
import ReactDOM from 'react-dom';
import Story from '../src/components/Story';
import { shallow } from 'enzyme';

it('Story component is rendering', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Story />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should throw error when the preview text is longer than 40 characters', () => {
  expect(() => {
    shallow(
      <Story text={41} />
    );
  }).toThrow();
});


it('should throw error when there is not author of story', () => {
  expect(() => {
    shallow(
      <Story by={' '} />
    );
  }).toThrow();
});

it('should throw error when there is not neither title nor body', () => {
  expect(() => {
    shallow(
      <Story title={' '} body={' '} />
    );
  }).toThrow();
});
