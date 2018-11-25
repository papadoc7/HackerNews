import React from 'react';
import { shallow } from 'enzyme';
import StoryPanel from '../src/components/StoryPanel'

it('should throw error when the preview text is longer than 40 characters', () => {
  expect(() => {
      shallow(
          <StoryPanel title={41} />
      );
  }).toThrow();
});

it('should throw error when there is not author of story', () => {
  expect(() => {
      shallow(
          <StoryPanel by={' '} />
      );
  }).toThrow();
});

it('should throw error when there is not neither title nor body', () => {
  expect(() => {
      shallow(
          <StoryPanel title={' '} body={' '} />
      );
  }).toThrow();
});
