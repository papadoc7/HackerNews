import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import "isomorphic-fetch";

const styles = theme => ({
  isExtended: {
    background: 'orange',
    position: 'relative',
  },

  isCollapsed: {  

  },

  title: {
    fontSize: '17px',
    padding: '20px',
    fontWeight: 'bold',
    border: 'double',
  },
});

class StoryPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
        expanded: false,
        comment: {},
        isLoading: false,
        error: null, //When an error occurs gives to the end-user an indication about the error
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    if(this.props.singleStory && this.props.singleStory.kids) {
      fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.singleStory.kids[0]}.json`)
      //throwing an error when the response doesn’t match the expected data
      .then(response => {
        if (response.ok) {
            console.log(response)
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => this.setState({ comment: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }))
    }
  }

  /**
   * Method that sets the initial state of story to false (collapsed)
   */
  getInitialState() {
      return {
        expanded: false
    };
  }

  /**
   * Method that checks if a story is expanded or not.
   * If yes the story will be collapsed otherwise will be expande.
   * ie from expanded to collapsed and vice versa
   */
  expandedText() {
    const temp = this.state.expanded ? false :  true;
    this.setState({
      expanded: temp
    })
  }

  /**
   * Method that displays more content of the story.
   * More specific from the 31st character and onwards.
   */
  getMoreTextDiv() {
    if (this.state.expanded) {
      return ( 
        <p dangerouslySetInnerHTML={{__html:
          this.state.comment && this.state.comment.text && this.state.comment.text.substr(41, 320)}}
        ></p>
      );
    } else {
      return null;
    }
  }

  render() {
    const { classes, singleStory, isLoading, error } = this.props;
    var expandedDiv = this.getMoreTextDiv();

    //show the error message as conditional rendering again
    if (error) {
      return <p>{error.message}</p>
    }

    //display a loading indicator 
    if (isLoading) {
      return <p>Loading ...</p>
    }

    return (
      <div className={classes.isCollapsed} onClick={() => this.expandedText()}>
        <b>{singleStory.title}</b>
        <br /><br />
        <p>By {singleStory.by}</p>
        <p dangerouslySetInnerHTML={{__html:
          this.state.comment && this.state.comment.text && this.state.comment.text.substr(1, 40)}}
        ></p>
        <div className={classes.isExtended}>
          { expandedDiv }
        </div>
      </div>
    );
      
  }
}

StoryPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StoryPanel);