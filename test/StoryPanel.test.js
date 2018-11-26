import React from 'react';
import ReactDOM from 'react-dom';
import StoryPanel from '../src/components/StoryPanel';

it('StoryPanel component is rendering', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StoryPanel />, div);
    ReactDOM.unmountComponentAtNode(div);
});
