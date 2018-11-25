import React, { Component } from 'react';
import StoryPanel from './StoryPanel';
import "isomorphic-fetch";

class Story extends Component {
  constructor(props) {
      super(props);

      this.state = {
          singleStory: {},
          isLoading: false,
          error: null, //When an error occurs gives to the end-user an indication about the error
      };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.story}.json`)
      //throwing an error when the response doesn’t match the expected data
      .then(response => {
        if (response.ok) {

          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => this.setState({ singleStory: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }))
  }

  render() {
      const { singleStory, error, isLoading } = this.state;

      if (!singleStory) {
          return <p>No data to display yet ...</p>
      }

      //show the error message as conditional rendering again
      if (error) {
        return <p>{error.message}</p>
      }

      //display a loading indicator 
      if (isLoading) {
        return <p>Loading ...</p>
      }
  
      return (
        <StoryPanel singleStory={singleStory} />
      );
  }

}

export default Story;