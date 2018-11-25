import React from 'react';
import ReactDOM from 'react-dom';
import Story from '../src/components/Story';

it('Story component is rendering', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Story />, div);
  ReactDOM.unmountComponentAtNode(div);
});
