import React, { Component } from 'react';
import Layout from './components/Layout';
import "isomorphic-fetch";

const API = 'https://hacker-news.firebaseio.com/v0/topstories.json';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stories: [],
            isLoading: false,
            error: null, //When an error occurs gives to the end-user an indication about the error
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch(API)
            //throwing an error when the response doesn’t match the expected data
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Something went wrong ...');
              }
            })
            .then(data => this.setState({ stories: data, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));            
    }

    render() {
        const { stories, isLoading, error } = this.state;

        if (!stories) {
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
            <React.Fragment>
                <Layout stories={stories} />
            </React.Fragment>
        );
    }
}

export default App;